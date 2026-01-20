# DRF Imports
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

# Local Imports
from .serializer import (
    UserSerializer, UserProfileSerializer,
    AddressSerializer, ProfileSerializer
)
from .models import Address



@api_view(['POST'])
def create_new_user(request):
    """
    Add User Data
    """
    serializer_obj = UserSerializer(data=request.data)
    if serializer_obj.is_valid(raise_exception=True):
        user = serializer_obj.save()
        return Response(
            {"Success" : f"User {user} Created Successfully."},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
        msg = "Logged out successfully."
    except Exception as e:
        msg = f"Failed to refresh token, err: {e}"

    response = Response({"message": msg})
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_user_profile(request):
    """
    Fetch loggedin User profile data
    """
    user = request.user
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update loggedin user profile
    """
    profile = request.user.profile
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Profile updated successfully"}, status=200)

    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user_data(request):
    """
    Update Loggedin User data
    """
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Profile updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_addresses(request):
    addresses = Address.objects.filter(user=request.user)
    serializer = AddressSerializer(addresses, many=True)
    return Response({"addresses": serializer.data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_address(request):
    serializer = AddressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"message": "Address added", "address": serializer.data})
    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def set_default_address(request, pk):
    Address.objects.filter(user=request.user, is_default=True).update(is_default=False)
    Address.objects.filter(pk=pk, user=request.user).update(is_default=True)
    return Response({"message": "Default address updated"})
