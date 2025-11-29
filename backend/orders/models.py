from django.db import models
from django.contrib.auth.models import User
from product.models import Product
from users.models import Address


STATUS = (
    ('PENDING', 'pending'),
    ('PAID', 'paid'),
    ('SHIPPED', 'shipped'),
    ('DELIVERED', 'delivered'),
    ('CANCELED', 'canceled'),
    ('REFUNDED', 'refunded'),
)

PAYMENT_STATUS = (
    ('PENDING', 'pending'),
    ('PAID', 'paid'),
    ('FAILED', 'failed'),
)

DELIVERY_STATUS = (
    ('PLACED', 'placed'),
    ('PACKED', 'packed'),
    ('SHIPPED', 'shipped'),
    ('OUT_FOR_DELIVERY', 'out_for_delivery'),
    ('DELIVERED', 'delivered'),
)


class Order(models.Model):
    user = models.ForeignKey(User, related_name='orders', on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)

    status = models.CharField(max_length=20, choices=STATUS, default='PENDING')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='PENDING')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.user}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product} x {self.quantity}"


class OrderTracking(models.Model):
    order = models.ForeignKey(Order, related_name='tracking', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=DELIVERY_STATUS, default='PLACED')
    location = models.CharField(max_length=255, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.order} - {self.status}"


class Invoice(models.Model):
    order = models.ForeignKey(Order, related_name='invoice', on_delete=models.CASCADE)
    pdf_url = models.URLField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice for Order {self.order.id}"
