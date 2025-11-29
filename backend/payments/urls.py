from django.urls import path
from .views import create_razorpay_order, verify_payment, cod_order

urlpatterns = [
    path("create-razorpay-order/", create_razorpay_order),
    path("verify/", verify_payment),
    path("cod-order/", cod_order),
    
]