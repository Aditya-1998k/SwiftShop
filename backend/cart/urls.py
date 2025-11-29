from django.urls import path
from .views import get_cart, add_to_cart, remove_cart_item
from .utils import merge_carts

urlpatterns = [
    path("", get_cart),
    path("add/", add_to_cart),
    path("remove/<int:product_id>/", remove_cart_item),
]
