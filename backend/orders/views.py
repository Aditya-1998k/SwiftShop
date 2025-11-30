from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer import OrderSerializer
from users.models import Address
from .models import Order, OrderItem
from datetime import timedelta
from .tasks import send_invoice_task


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    address_id = request.data.get("address_id")
    cart_items = request.data.get("items")
    total_amount = request.data.get("total_amount")

    if not Address.objects.filter(id=address_id, user=request.user).exists():
        return Response({"error": "Invalid address"}, status=400)

    address = Address.objects.get(id=address_id)

    # Create Order
    order = Order.objects.create(
        user=request.user,
        address=address,
        total_amount=total_amount,
        subtotal=total_amount,
        discount=0,
        status="PENDING",
        payment_status="PENDING"
    )

    # Create Order Items
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product_id=item["id"],
            quantity=item["qty"],
            price=item["price"],
            total=item["qty"] * float(item["price"])
        )

    return Response({
        "order_id": order.id,
        "message": "Order created"
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def latest_order(request):
    order = Order.objects.filter(user=request.user).order_by("-id").first()

    if not order:
        return Response({"error": "No order found"}, status=404)

    return Response({
        "order_id": order.id,
        "total_amount": order.total_amount,
        "payment_id": order.transaction_id,
        "created_at": order.created_at,
        "status": order.status,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def latest_order(request):
    order = Order.objects.filter(user=request.user).order_by("-id").first()

    if not order:
        return Response({"error": "No order found"}, status=404)

    return Response({
        "order_id": order.id,
        "total_amount": order.total_amount,
        "payment_id": order.transaction_id,
        "created_at": order.created_at,
        "status": order.status,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-id")

    data = OrderSerializer(orders, many=True).data

    if not data:
        return Response({"error": "No orders found"}, status=404)

    return Response({"orders": data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_details(request, id):
    try:
        order = Order.objects.select_related("address", "user")\
            .prefetch_related("items", "tracking")\
                .get(id=id)

        if order.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    # Get latest delivery status from tracking
    latest_tracking = order.tracking.order_by("-updated_at").first()
    delivery_status = latest_tracking.status if latest_tracking else "PLACED"

    # Build items
    items = [
        {
            "id": item.id,
            "product_name": item.product.name if item.product else "Product Removed",
            "quantity": item.quantity,
            "price": str(item.price),
            "total": str(item.total),
        }
        for item in order.items.all()
    ]

    # Build response
    data = {
        "order": {
            "id": order.id,
            "created_at": order.created_at,
            "status": order.status,
            "payment_status": order.payment_status,
            "delivery_status": delivery_status,

            "subtotal": str(order.subtotal),
            "discount": str(order.discount),
            "total_amount": str(order.total_amount),

            "address": {
                "full_name": order.address.name,
                "address_line": order.address.line1,
                "city": order.address.city,
                "state": order.address.state,
                "pincode": order.address.pincode,
                "phone": order.address.phone,
            },

            "items": items,
        }
    }

    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def track_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id)

        if order.user != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    # ------------------------
    # Expected Delivery = order_date + 7 days (TODO)
    # ------------------------
    expected_delivery = order.created_at + timedelta(days=7)

    # ------------------------
    # Fetch all tracking steps in chronological order
    # ------------------------
    steps_data = []
    tracking_steps = order.tracking.order_by("updated_at")

    # Convert tracking entries to your frontend format
    for entry in tracking_steps:
        steps_data.append({
            "title": entry.status.replace("_", " ").title(),   # OUT_FOR_DELIVERY -> Out For Delivery
            "completed": True,
            "date": entry.updated_at.strftime("%d %b %Y"),
        })

    # -------------------------
    # Fill remaining steps (if not completed)
    # -------------------------
    ALL_STEPS = [
        "PLACED",
        "PACKED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
    ]

    completed_statuses = {s.status for s in tracking_steps}

    for step in ALL_STEPS:
        if step not in completed_statuses:
            steps_data.append({
                "title": step.replace("_", " ").title(),
                "completed": False,
                "date": None,
            })

    # Final timeline in correct order
    timeline = sorted(
        steps_data,
        key=lambda x: ALL_STEPS.index(x["title"].upper().replace(" ", "_"))
    )

    return Response({
        "order_id": order.id,
        "expected_delivery": expected_delivery.strftime("%d %b %Y"),
        "tracking_steps": timeline,
    }, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_invoice(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)

    # Trigger Celery task
    send_invoice_task.delay(order.id)

    return Response({
        "message": "Invoice will be emailed shortly."
    }, status=200)
