from django.urls import path
from .views import (
    fetch_all_product_with_category,
    get_category_product,
    fetch_product_with_id,
    search_products,
    add_product_review
)

urlpatterns = [
    path("categories-products/", fetch_all_product_with_category),
    path("category/<slug:category_slug>/products/", get_category_product),
    path("product/<int:id>/", fetch_product_with_id),
    path("search/", search_products),
    path("product/<int:id>/review/", add_product_review),
]