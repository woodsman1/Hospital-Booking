from django.db import models
from django.contrib.auth.models import User


class RefreshToken(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    token = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.user}'

class Day(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return f'{self.name}'
    

class Slot(models.Model):
    title = models.CharField(max_length=250)
    start_time = models.TimeField()
    end_time = models.TimeField()
    break_time = models.BooleanField(default=False)
    booked = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title} - {self.start_time} to {self.end_time}'


class Time_Table(models.Model):
    # title = models.CharField(max_length=250)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    slots = models.ManyToManyField(Slot)

    def __str__(self):
        return f'{self.day}'


class Booking(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.patient}, booked {self.slot.title} on {self.date}'