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



class BookingSlotsApi(APIView):

    permission_classes = (IsAuthenticated,)

    # get the Booked slot details by date entered
    def get(self, request):
        user = self.get_user(request)
        booked_slots = Booking.objects.filter(patient=user).order_by("date")
        res = []

        for booking in booked_slots:
            x = {}
            
            x["id"] = booking.pk
            x["username"] = booking.patient.username
            x["day"] = booking.day.name
            x["date"] = booking.date
            x["slot_name"] = booking.slot.title
            x["slot_start"] = booking.slot.start_time
            x["slot_end"] = booking.slot.end_time
            
            res.append(x)        

        return Response(res)
    
    def post(self, request):  
        serializer = BookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        if obj is None:
            return Response("")
        return obj
    
    
    def get_user(self, request):
        _, token = request.META.get('HTTP_AUTHORIZATION').split(' ')
        user = get_object_or_404(Token, key=token).user
        
        return user


class DeleteBookedSlotApI(APIView):

    def post(self, request):
        user = self.get_user(request)
        if user is not None:
            obj = Booking.objects.get(pk=request.data["id"])
            if obj.patient.pk == user.pk:
                obj.delete()
                return Response("Record Deleted")
        return Response("Bad Request...Unable to Delete")


    def get_user(self, request):
        _, token = request.META.get('HTTP_AUTHORIZATION').split(' ')
        user = get_object_or_404(Token, key=token).user
        
        return user


class Time_tableApi(APIView):

    def post(self, request): 
        try:
            serializer = DayDateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            day = serializer.validated_data["name"]
            date = serializer.validated_data["date"]

            day = Day.objects.get(name=day)
            schedule = Time_Table.objects.get(day=day)

            slots = schedule.slots.all().order_by("start_time")

            for slot in slots:
                slot.booked = check_booked_slot(date, slot)
            
            serializer = SlotSerializer(slots, many=True)
            
            return Response(serializer.data)
        except:
            return Response([])

