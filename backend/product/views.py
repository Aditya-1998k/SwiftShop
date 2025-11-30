from django.db.models import Avg
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import CategoryWithProductSerializer, ProductSerializer, ReviewSerializer
from .models import Category, Product


@api_view(["GET"])
def category_with_products(request):
    try:
        categories = Category.objects\
            .prefetch_related("products__images")\
            .filter(entity_active="Y")
        
        data = CategoryWithProductSerializer(categories, many=True).data
        return Response({"categories": data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"error": f"Unable to fetch due to error {e}"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(["GET"])
def products_by_category(request, category_slug):
    try:
        category = Category.objects.get(slug=category_slug, entity_active="Y")
    except Category.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

    # Fetch all active products in that category
    products = Product.objects.filter(
        category=category,
        entity_active="Y"
    ).prefetch_related("images")

    serializer = ProductSerializer(products, many=True)
    return Response({
        "category": category.name,
        "category_slug": category.slug,
        "products": serializer.data
    })


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
