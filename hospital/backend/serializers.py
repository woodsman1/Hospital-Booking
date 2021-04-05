from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Time_Table, Booking, Day



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

class DateSerializer(serializers.ModelSerializer):
    date = serializers.DateField()

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = "__all__"

class BookingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"