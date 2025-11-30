from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .utils import merge_carts


@receiver(user_logged_in)
def auto_merge_cart(sender, request, user, **kwargs):
    """
    This is defined to merge the cart item
    when user logged in
    """
    session_key = request.session.session_key
    if session_key:
        merge_carts(user, session_key)
