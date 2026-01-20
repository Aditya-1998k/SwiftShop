from django.urls import path
from .views import (
    create_new_user,
    logout_user,
    fetch_user_profile,
    update_user_data,
    update_profile,
    get_addresses,
    add_address,
    set_default_address
)
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path("create_user/", create_new_user, name="create user"),
    path("profile/", fetch_user_profile, name="my profile"),
    path('profile/update/', update_profile, name='update-profile'),
    path('user/update/', update_user_data, name='update-user-data'),
    
    # jwt token api
    path("api/token/", TokenObtainPairView.as_view(), name="obtain the token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh the token"),
    path("api/logout/", logout_user, name="logout"),

    # address
    path("addresses/", get_addresses),
    path("address/add/", add_address),
    path("address/default/<int:pk>/", set_default_address),
]
