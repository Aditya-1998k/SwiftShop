from django.db import models
from orders.models import Order
from orders.models import PAYMENT_STATUS


PAYMENT_METHOD = (
    ("UPI", "upi"),
    ("CARD", "card"),
    ("COD", "cod"),
    ("WALLET", "wallet")
)

class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHOD, default="COD")
    transaction_id = models.CharField(max_length=20)
    provider_response = models.JSONField()
    amout = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default="PENDING")
    paid_at = models.DateTimeField(auto_now_add=True)

