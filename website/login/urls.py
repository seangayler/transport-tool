from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login_user', views.login_user)
]
