from django.urls import path
from .views import (
    get_cart,
    add_to_cart,
    remove_cart_item
)

urlpatterns = [
    path("", get_cart, name="get item in cart"),
    path("add/", add_to_cart, name="add item in cart"),
    path("remove/<int:product_id>/", remove_cart_item, name="remove item from cart"),
]
