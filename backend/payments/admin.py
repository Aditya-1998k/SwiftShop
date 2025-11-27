from django.contrib import admin
from . import models

admin.site.register(
   [models.Payment, models.Coupon, models.CouponUsage]
)
