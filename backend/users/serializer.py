from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message = "A user with same email already exists. Please login"
        )]
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]
        extra_kwargs = {
            "password": {"write_only": True}  # hide password in responses
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)  # HASH THE PASSWORD
        user.save()
        return user

#Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["bio", "phone", "address"]

class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile"]

