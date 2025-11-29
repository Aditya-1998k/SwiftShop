from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializer import OrderSerializer
from users.models import Address
from .models import Order, OrderItem


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
