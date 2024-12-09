from rest_framework import serializers
from .models import Employee
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class EmployeeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Employee
        fields = '__all__'

# class LeaveSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Leave
#         fields = '__all__'