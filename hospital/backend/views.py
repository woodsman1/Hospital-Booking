from django.shortcuts import render, get_object_or_404

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .signals import get_refresh_token
from .serializers import *
from .models import *
from .managment import check_booked_slot


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



class UserRegistrationApi(APIView):

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['created'] = 1
            data["id"] = user.pk
            data["username"] = user.username
            data["email"] = user.email
            data["token"] = Token.objects.get(user=user).key
            data["refresh_token"] = get_refresh_token(user=user)
        else:
            data['created'] = 0
            data["error"] = serializer.errors
        return Response(data)

class getAccessToken(APIView):

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token',None)
        if refresh_token is None:
            return Response({"error" : "No refresh token detected"})
        obj = RefreshToken.objects.filter(token= refresh_token)
        if obj.count()==0:
            return Response({"error" : "Not a valid token"})
        else:
            token = Token.objects.get(user = obj[0].user)
            return Response({"token" : token.key})


# booking slot class 
# Get slots details
# book slots

class BookingSlotsApi(APIView):

    # permission_classes = (IsAuthenticated,)

    # get the Booked slot details by date entered
    def get(self, request):
        serializer = DateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        booked_slots = Booking.objects.filter(date=serializer.validated_data["date"])
        
        serializer = BookingDetailSerializer(booked_slots, many=True)

        return Response(serializer.data)
    
    def post(self, request):  
        pass

class Time_tableApi(APIView):

    # permission_classes = (IsAuthenticated,)

    # eg "name":"Monday" and "date":"2021-06-12"
    def post(self, request): 
        try:
            serializer = DayDateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            day = serializer.validated_data["name"]
            date = serializer.validated_data["date"]

            day = Day.objects.get(name=day)
            schedule = Time_Table.objects.get(day=day)

            slots = schedule.slots.all()

            for slot in slots:
                slot.booked = check_booked_slot(date, slot)
            
            serializer = SlotSerializer(slots, many=True)
            
            return Response(serializer.data)
        except:
            return Response([])

# add class for updating slots

class SlotApi(APIView):

    # Get slot details by id
    def get(self, request):
        serializer = IdSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        id = serializer.validated_data["id"]
        slot = Slot.objects.get(pk=id)

        serializer = SlotSerializer(slot)
        print(serializer)
        return Response(serializer.data)

    # update slot
    def post(self, request):
        pass



