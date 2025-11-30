from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order
from .tasks import send_invoice_task


@receiver(post_save, sender=Order)
def send_invoice_on_order_create(sender, instance, created, **kwargs):
    if created:
        # Submit task to Celery
        send_invoice_task.delay(instance.id)
