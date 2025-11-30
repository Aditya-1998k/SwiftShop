from django.urls import path
from .views import create_user, logout_view, my_profile, get_addresses, add_address, set_default_address
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path("profile/", my_profile, name="my profile"),
    path("create_user/", create_user, name="create user"),
    
    # jwt token api
    path("api/token/", TokenObtainPairView.as_view(), name="obtain the token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh the token"),
    path("api/logout/", logout_view, name="logout"),

    # address
    path("addresses/", get_addresses),
    path("address/add/", add_address),
    path("address/default/<int:pk>/", set_default_address),
]
