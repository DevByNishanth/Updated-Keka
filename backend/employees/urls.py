from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from employees.views import EmployeeViewSet

urlpatterns = [
    path('employees/', EmployeeViewSet.as_view(), name='emloyees')
]