from django.urls import path
from .views import create_order, latest_order, user_orders, order_details, track_order, send_invoice

urlpatterns = [
    path("create/", create_order),
    path("latest/", latest_order),
    path("my-orders/", user_orders),
    path("details/<int:id>/", order_details),
    path("<int:order_id>/track/", track_order),
    path("<int:order_id>/send-invoice/", send_invoice),
]
