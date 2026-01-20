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


@shared_task
def send_promotional_emails():
    try:
        users = User.objects.filter(profile__promotional_emails=True)
    except User.DoesNotExist:
        return "User not found"

    for user in users:
        subject="🔥 Special Offer Just for You!"
        body=(
            f"Hi {user.username}\n\n"
            "We have new discounts waiting for you.\n"
            "Visit SwiftShop now and save more today!\n\n"
            "🚀 Limited time offers!\n\n"
            "- Team SwiftShop"
        )
        email = EmailMessage(
            subject=subject,
            body=body,
            to=[user.email]
        )
        email.send()
    return f"Sent promotional emails to {users.count()} users"
