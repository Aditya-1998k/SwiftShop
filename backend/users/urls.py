from django.urls import path
from .views import ProfileViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('profile', ProfileViewset, basename='user_profile')

urlpatterns = [
] + router.urls
