from django.urls import path
from .views import *

app_name = "frontend"

urlpatterns = [
    
    path("", index, name='index'),
    path("login/", index, name='index'),
    path("sign-up/", index, name='index'),
    path("your-bookings/", index, name='index'),

]