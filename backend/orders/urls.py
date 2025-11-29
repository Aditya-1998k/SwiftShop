from django.urls import path
from .views import create_order, latest_order, user_orders

urlpatterns = [
    path("create/", create_order),
    path("latest/", latest_order),
    path("my-orders/", user_orders),
]
