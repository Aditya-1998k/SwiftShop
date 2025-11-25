from .serializer import UserSerializer, UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    serializer_obj = UserSerializer(data=request.data)
    if serializer_obj.is_valid(raise_exception=True):
        user = serializer_obj.save()
        return Response({
            "Success" : f"User {user} Created Successfully."
        }, status=status.HTTP_201_CREATED
        )

    return Response(serializer_obj.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
    except Exception:
        pass
    
    response = Response({"message": "Logged out successfully"})
    response.delete_cookie("refresh_token")
    return response
