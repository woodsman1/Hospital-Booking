from django.urls import path
from .views import *

app_name = "backend"

urlpatterns = [
    
    path("register/", UserRegistrationApi.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view()),
    path('refresh/', getAccessToken.as_view()),
    path('booking-detail/', BookingSlotsApi.as_view(), name='bookingdetail'),
    path('time-table/', Time_tableApi.as_view(), name='time-table'),
    path('slot/', SlotApi.as_view(), name='slot'),

]