from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from product.models import Product


@api_view(["POST"])
def add_to_cart(request):
    product_id = request.data.get("product_id")
    qty = int(request.data.get("quantity", 1))

    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)

    else:
        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key

        cart, _ = Cart.objects.get_or_create(session_key=session_key)

    product = Product.objects.get(id=product_id)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product_id=product_id,
        price_at_time=product.price
    )

    if not created:
        item.quantity += qty
        item.price_at_time = product.price

    item.save()

    return Response({"message": "Item added"}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_cart(request):
    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        session_key = request.session.session_key
        cart = Cart.objects.filter(session_key=session_key).first()

    if not cart:
        return Response({"items": []})
    
    data = [
        {
            "id": item.product.id,
            "name": item.product.name,
            "price": item.product.price,
            "image": item.product.images.first().image_url if item.product.images.first() else None,
            "qty": item.quantity,
        }
        for item in cart.items.all()
    ]

    return Response({"items": data})


@api_view(["DELETE"])
def remove_cart_item(request, product_id):
    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        session_key = request.session.session_key
        cart = Cart.objects.filter(session_key=session_key).first()

    if not cart:
        return Response({"message": "Cart empty"}, status=404)

    CartItem.objects.filter(cart=cart, product_id=product_id).delete()
    return Response({"message": "Item removed"})
