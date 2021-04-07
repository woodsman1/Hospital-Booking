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

class BookingSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    date = serializers.DateField()
    name = serializers.CharField()
    slot_id = serializers.IntegerField()

    def save(self, **kwargs):
        try:
            user = User.objects.get(pk=self.validated_data["user_id"])
            date = self.validated_data["date"]
            day = Day.objects.get(name=self.validated_data["name"])
            slot = Slot.objects.get(pk=self.validated_data["slot_id"])
            print("done")

            obj = Booking(patient=user, date=date, day=day, slot=slot)
            obj = obj.save()
            return obj
        except:
            return None 

class BookingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        feilds = "__all__"

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ["pk" ,"title", "start_time", "end_time", "break_time", "booked"]
    

class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()