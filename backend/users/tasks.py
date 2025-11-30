
# users/tasks.py
from celery import shared_task
from django.core.mail import EmailMessage
from django.contrib.auth.models import User



@shared_task
def send_welcome_email_task(user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return "User not found"

    subject = f"Welcome to SwiftShop, {user.username}!"
    body = (
        f"Hi {user.username},\n\n"
        "Welcome to SwiftShop! 🎉\n"
        "Your account has been created successfully.\n\n"
        "You can now browse products, add to cart, and place your first order.\n"
        "If you need any help, feel free to contact support@swiftshop.com.\n\n"
        "Happy Shopping!\n"
        "- SwiftShop Team"
    )

    email = EmailMessage(
        subject=subject,
        body=body,
        to=[user.email],
    )

    email.send()

    return f"Welcome email sent to {user.email}"
