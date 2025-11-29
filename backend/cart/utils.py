from .models import Cart, CartItem

def merge_carts(user, session_key):
    try:
        guest_cart = Cart.objects.get(session_key=session_key)
    except Cart.DoesNotExist:
        return

    user_cart, _ = Cart.objects.get_or_create(user=user)

    for item in guest_cart.items.all():
        exist, created = CartItem.objects.get_or_create(
            cart=user_cart,
            product=item.product
        )
        if not created:
            exist.quantity += item.quantity
        exist.save()

    guest_cart.delete()
