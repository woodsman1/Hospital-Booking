from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Time_Table, Booking


class Booking(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"



class Time_Table(serializers.ModelSerializer):
    class Meta:
        model = Time_Table
        fields = '__all__'