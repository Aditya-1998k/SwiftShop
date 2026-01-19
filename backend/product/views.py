from django.db.models import Avg
from rest_framework.decorators import api_view
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework import status
from .serializer import CategoryWithProductSerializer, ProductSerializer, ReviewSerializer
from .models import Category, Product, Review

@api_view(["GET"])
def category_with_products(request):
    """
    Fetch all categories with products
    Cached forever (until manually invalidated or evicted)
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

    return Response(
        {"categories": data},
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
def products_by_category(request, category_slug):
    """
    Return all active products for a category
    Cached forever (manual invalidation)
    """
    cache_key = category_slug

    data = cache.get(cache_key)
    if data is not None:
        return Response(data, status=status.HTTP_200_OK)

    try:
        category = Category.objects.get(
            slug=category_slug,
            entity_active="Y"
        )
    except Category.DoesNotExist:
        return Response(
            {"error": "Category not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    products = (
        Product.objects
        .filter(category=category, entity_active="Y")
        .prefetch_related("images")
    )

    data = {
        "category": category.name,
        "category_slug": category.slug,
        "products": ProductSerializer(products, many=True).data
    }

    cache.set(cache_key, data, timeout=None)

    return Response(data, status=status.HTTP_200_OK)



@api_view(["GET"])
def get_product(request, id):
    try:
        product = Product.objects.filter(id=id).first()
        if not product:
            return Response({"error": "Product not found"}, status=404)

        product_data = ProductSerializer(product).data

        reviews = product.reviews.all().order_by("-created_at")
        reviews_data = ReviewSerializer(reviews, many=True).data

        avg_rating = reviews.aggregate(Avg("rating"))["rating__avg"]
        total_reviews = reviews.count()

        return Response({
            "product": product_data,
            "reviews": reviews_data,
            "average_rating": round(avg_rating, 1) if avg_rating else None,
            "total_reviews": total_reviews
        }, status=200)

    except Exception as e:
        print("Error:", e)
        return Response({"error": "Something went wrong"}, status=500)

@api_view(["GET"])
def search_products(request):
    query = request.GET.get("q", "")

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)

    return Response({"products": serializer.data})


@api_view(["POST"])
def add_product_review(request, id):
    rating = request.data.get("rating")
    review_text = request.data.get("review_text")
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return Response({"message": "Item does not exist"})

    Review.objects.create(
        product=product,
        rating=rating,
        user=request.user,
        review_text=review_text
    )
    return Response({"message": "Review added successfully"}, status=status.HTTP_201_CREATED)
