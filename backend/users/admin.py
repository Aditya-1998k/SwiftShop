from django.contrib import admin
from .models import Profile, Address

admin.site.register([Profile, Address])
