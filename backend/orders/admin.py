from django.contrib import admin
from . import models

admin.site.register(
    [models.Invoice, models.Order, models.OrderItem, models.OrderTracking]
)
