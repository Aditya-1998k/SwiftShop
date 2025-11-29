from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import CategoryWithProductSerializer, ProductSerializer
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
        serializer = ProductSerializer(product).data
        return Response({"product": serializer}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
