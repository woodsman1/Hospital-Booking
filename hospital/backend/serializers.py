from django.contrib.auth.models import User
from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import Time_Table, Booking, Day, Slot



class Time_TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time_Table
        fields = '__all__'


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', "email", "password"]
        extra_kwargs = {'password': {"write_only":True}}

    def save(self):
        user = User(
            username = self.validated_data['username'],
            email = self.validated_data['email']
        )
        user.set_password(self.validated_data['password'])
        user.save()
        return user

class DateSerializer(serializers.Serializer):
    date = serializers.DateField()


class DayDateSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    class Meta:
        model = Day
        fields = ["name", "date"]

class BookingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ["title", "start_time", "end_time", "break_time", "booked"]
    

class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()