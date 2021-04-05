from django.db import models
from django.contrib.auth.models import User


class Day(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return f'{self.name}'
    


class Slot(models.Model):
    title = models.CharField(max_length=250)
    start_time = models.TimeField()
    end_time = models.TimeField()
    break_time = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.pk} - {self.title}'


class Time_Table(models.Model):
    title = models.CharField(max_length=250)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    slots = models.ManyToManyField(Slot)

    def __str__(self):
        return f'{self.day} - {self.title}'


