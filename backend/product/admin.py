from django.contrib import admin
from . import models

admin.site.register(
    [models.Product, models.Category, models.ProductImages, models.Review]
)
