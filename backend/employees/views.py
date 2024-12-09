from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# class EmployeeViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
    
#     def get_queryset(self):
#         if self.request.user.is_superuser:
#             return Employee.objects.all()
#         return Employee.objects.filter(employee_id=self.request.user)

class EmployeeViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
