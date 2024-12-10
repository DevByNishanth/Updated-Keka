from rest_framework import serializers
from .models import Leave  

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['leave_id','leave_type', 'fromDate', 'toDate', 
                  'time_period', 'notes', 'notify', 'user_id', 'created_at','status','user_name']

