from django.db import models
from django.contrib.auth.models import User
from orders.models import Order, PAYMENT_STATUS


PAYMENT_METHOD = (
    ("UPI", "upi"),
    ("CARD", "card"),
    ("COD", "cod"),
    ("WALLET", "wallet"),
)


class Payment(models.Model):
    order = models.ForeignKey(Order, related_name='payments', on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD, default="COD")
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    provider_response = models.JSONField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default="PENDING")
    paid_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} - {self.status}"


DISCOUNT_TYPE = (
    ('FLAT', 'Flat'),
    ('PERCENT', 'Percentage'),
)


class Coupon(models.Model):
    code = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=150, blank=True)
    discount_type = models.CharField(max_length=10, choices=DISCOUNT_TYPE, default='FLAT')
    value = models.DecimalField(max_digits=10, decimal_places=2)
    min_purchase_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usage_limit = models.PositiveIntegerField(default=1)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    entity_active = models.CharField(max_length=1, default='Y')

    def __str__(self):
        return self.code


class CouponUsage(models.Model):
    coupon = models.ForeignKey(Coupon, related_name='usage', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    used_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} used {self.coupon.code}"
