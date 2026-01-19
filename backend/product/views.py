# Core Django Imports
from django.db.models import Avg
from django.core.cache import cache

# DRF Imports
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Local Imports
from .serializer import CategoryWithProductSerializer, ProductSerializer, ReviewSerializer
from .models import Category, Product, Review


@api_view(["GET"])
def fetch_all_product_with_category(request):
    """
    Fetch all products grouped by category
    Args: None
    Return: Return all product grouped by category
    """
    cache_key = "category_with_products"

    data = cache.get(cache_key)

    if data is None:
        categories = (
            Category.objects
            .prefetch_related("products__images")
            .filter(entity_active="Y")
        )
        data = CategoryWithProductSerializer(categories, many=True).data
        cache.set(cache_key, data, timeout=None)

    return Response({"categories": data}, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_category_product(request, category_slug):
    """
    Return all active products for a category
    Args: category_slug
    Return: Return all product of specific category
    """
    cache_key = category_slug

    data = cache.get(cache_key)
    if data is None:
        category = Category.objects.get(
            slug=category_slug, entity_active="Y"
        )
        products = Product.objects\
            .filter(category=category, entity_active="Y")\
            .prefetch_related("images")

        data = {
            "category": category.name,
            "category_slug": category.slug,
            "products": ProductSerializer(products, many=True).data
        }
        cache.set(cache_key, data, timeout=None)

    return Response(data, status=status.HTTP_200_OK)


@api_view(["GET"])
def fetch_product_with_id(request, id):
    """
    Fetch product with product_id (id)
    Args: product_id
    Return: Retun product filtered by product_id
    """
    product = Product.objects.filter(id=id).first()
    if not product:
        return Response({"error": "Product not found"}, status=404)
    product_data = ProductSerializer(product).data

    reviews = product.reviews.all().order_by("-created_at")
    reviews_data = ReviewSerializer(reviews, many=True).data
    avg_rating = reviews.aggregate(Avg("rating"))["rating__avg"]

    return Response({
        "product": product_data,
        "reviews": reviews_data,
        "average_rating": round(avg_rating, 1) if avg_rating else None,
    }, status=200)


@api_view(["GET"])
def search_products(request):
    """
    Fetch all product with query params
    """
    query = request.GET.get("q", "")
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)

    return Response({"products": serializer.data})


@api_view(["POST"])
def add_product_review(request, id):
    """
    Add product review for a item
    """
    rating = request.data.get("rating")
    review_text = request.data.get("review_text")
    product = Product.objects.get(id=id)

    Review.objects.create(
        product=product,
        rating=rating,
        user=request.user,
        review_text=review_text
    )
    return Response(
        {"message": "Review added"},
        status=status.HTTP_201_CREATED
    )
