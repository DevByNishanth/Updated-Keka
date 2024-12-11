from rest_framework import serializers
from .models import Leave_admin
from django.contrib.auth.models import User



class AdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Leave_admin
        fields = '__all__'

