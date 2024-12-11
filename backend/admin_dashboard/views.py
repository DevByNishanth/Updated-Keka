from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Leave_admin
from .serializers import AdminSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class AdminViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admin_leave = Leave_admin.objects.all()
        serializer = AdminSerializer(admin_leave, many=True)
        return Response(serializer.data)

    # Handle POST request
    def post(self, request):
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

