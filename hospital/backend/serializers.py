from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Time_Table

class Time_Table(serializers.ModelSerializer):
    class Meta:
        model = Time_Table
        fields = '__all__'