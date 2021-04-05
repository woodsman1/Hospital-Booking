from django.shortcuts import render

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .signals import get_refresh_token


class CustomAuthToken(ObtainAuthToken, APIView):

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
            
        Token.objects.filter(user=user).delete()
        refresh_token = get_refresh_token(user=user)
        token, created = Token.objects.get_or_create(user=user)

        
        data = {
            "id": user.pk,
            "username" : user.username,
            "token":token.key,
            "refresh_token": refresh_token,
        }

        return Response(data)