from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment
from .tasks import send_payment_receipt_task


@receiver(post_save, sender=Payment)
def trigger_receipt_on_payment_success(sender, instance, created, **kwargs):
    # Only send when payment succeeds
    if instance.status == "PAID" and instance.transaction_id:
        send_payment_receipt_task.delay(instance.order.id)