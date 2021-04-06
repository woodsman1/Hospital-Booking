from django.urls import path
from rest_framework.authtoken import views
from .views import *

app_name = "backend"

urlpatterns = [
    
    path("register/", UserRegistrationApi.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view()),
    path('refresh/', getAccessToken.as_view()),

]