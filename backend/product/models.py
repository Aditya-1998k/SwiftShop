from django.db import models


YN_CHOICES = [
    ('Y', 'Active'),
    ('N', 'Inactive'),
]


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    parent_category = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='subcategories'
    )
    entity_active = models.CharField(max_length=1, choices=YN_CHOICES, default='Y')

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )
    brand = models.CharField(max_length=100, blank=True)
    entity_active = models.CharField(max_length=1, choices=YN_CHOICES, default='Y')

    def __str__(self):
        return self.name


class ProductImages(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField()
    is_primary = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.name}"
