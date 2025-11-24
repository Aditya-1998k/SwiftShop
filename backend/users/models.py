from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user =  models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=255, blank=True)
    phone = models.IntegerField(null=True)
    address = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user} - from - {self.address}"
