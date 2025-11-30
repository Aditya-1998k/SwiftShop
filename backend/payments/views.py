import razorpay
from razorpay.errors import SignatureVerificationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.models import Address
from orders.models import Order, OrderItem, OrderTracking
from .models import Payment
from cart.models import Cart, CartItem
from django.conf import settings

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_razorpay_order(request):
    amount = request.data.get("amount")   # in paise
    order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1,
    })
    return Response({
        "key": settings.RAZORPAY_KEY_ID,
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"],
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    data = request.data
    user = request.user

    # ------------------------------------
    # 0. Verify Razorpay payment signature
    # ------------------------------------
    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"],
        })
    except SignatureVerificationError:
        return Response({"status": "failed"}, status=400)

    # ------------------------------------
    # 1. Get Address for the User
    # ------------------------------------
    address_id = data.get("address_id")
    try:
        address = Address.objects.get(id=address_id, user=user)
    except Address.DoesNotExist:
        return Response({"error": "Invalid address"}, status=400)

    # ------------------------------------
    # 2. Get Cart + Cart Items
    # ------------------------------------
    cart = Cart.objects.get(user=user)
    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    # ------------------------------------
    # 3. Calculate subtotal, discount, total
    # ------------------------------------
    subtotal = sum(item.product.price * item.quantity for item in cart_items)

    discount = data.get("discount", 0)  # If coupon applied, pass from frontend
    # brea
    total_amount = subtotal# - float(discount)

    # ------------------------------------
    # 4. Create Order
    # ------------------------------------
    order = Order.objects.create(
        user=user,
        address=address,
        subtotal=subtotal,
        discount=discount,
        transaction_id=data["razorpay_payment_id"],
        total_amount=total_amount,
        status="PAID",             # Order Paid
        payment_status="PAID",     # Payment captured
    )

    # ------------------------------------
    # 5. Create Order Items
    # ------------------------------------
    order_items = []
    for item in cart_items:
        order_items.append(
            OrderItem(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
                total=item.product.price * item.quantity
            )
        )

    OrderItem.objects.bulk_create(order_items)

    # ------------------------------------
    # 6. Create Payment Record
    # ------------------------------------
    Payment.objects.create(
        order=order,
        payment_method="UPI",  # Or from frontend: data.get("payment_method")
        transaction_id=data["razorpay_payment_id"],
        provider_response=data,      # Full Razorpay response
        amount=total_amount,
        status="PAID"
    )

    # ------------------------------------
    # 7. Create Initial Tracking (PLACED)
    # ------------------------------------
    OrderTracking.objects.create(
        order=order,
        status="PLACED",
        location="Order Placed"
    )

    # ------------------------------------
    # 8. Clear cart
    # ------------------------------------
    cart_items.delete()

    return Response({
        "status": "success",
        "order_id": order.id
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cod_order(request):
    user = request.user
    data = request.data

    address_id = data.get("address_id")
    try:
        address = Address.objects.get(id=address_id, user=user)
    except Address.DoesNotExist:
        return Response({"error": "Invalid address"}, status=400)

    cart = Cart.objects.get(user=user)
    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({"error": "Cart empty"}, status=400)

    total_amount = sum(item.product.price * item.quantity for item in cart_items)

    # Create order without payment
    order = Order.objects.create(
        user=user,
        address=address,
        total_amount=total_amount,
        subtotal=total_amount,
        status="PENDING",
        payment_status="PENDING"
    )

    order_items = []
    for item in cart_items:
        order_items.append(
            OrderItem(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
                total=item.product.price * item.quantity,
            )
        )
    OrderItem.objects.bulk_create(order_items)

    cart_items.delete()

    return Response({"status": "success", "order_id": order.id})
