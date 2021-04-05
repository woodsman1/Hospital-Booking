from django.contrib import admin
from .models import Day, Slot, Time_Table

# Register your models here.

admin.site.register(Day)
admin.site.register(Slot)
admin.site.register(Time_Table)
