from rest_framework import serializers
from .models import Category, Product, ProductImages


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['image_url', 'is_primary']


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "brand", "description", "image"]
    
    def get_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return primary.image_url
        
        first_image = obj.images.first()
        if first_image:
            return first_image.image_url
    
        return None

class CategoryWithProductSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "products"]
