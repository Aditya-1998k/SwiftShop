from django.urls import path
from .views import category_with_products, products_by_category, get_product

urlpatterns = [
    path("categories-products/", category_with_products, name="product with category"),
    path("category/<slug:category_slug>/products/", products_by_category),
    path("product/<int:id>/", get_product)
]