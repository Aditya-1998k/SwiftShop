from django.shortcuts import render
from .models import Profile
from .serializer import ProfileSerializer
from rest_framework import viewsets


class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.filter(user=2)
    serializer_class = ProfileSerializer
