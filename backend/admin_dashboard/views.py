from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Leave_admin, Leave_admin_card
from .serializers import AdminSerializer, AdminCardSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class AdminViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Leave_admin.objects.all()
        serializer = AdminSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk=None):
        """
        Handle PUT request to update a Leave_admin object by ID.
        """
        try:
            print(request.data)
            admin_leave = Leave_admin.objects.get(leave_id=pk)
        except Leave_admin.DoesNotExist:
            return Response({"error": "Leave record not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminSerializer(admin_leave, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminCardViewSet(APIView):
    def get(self, request):
        queryset = Leave_admin_card.objects.all()
        serializer = AdminCardSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AdminCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk = None):
        """
        Handle DELETE request to delete a Leave_admin_card object by ID.
        """
        # delete_data = request.data 
        # leaveid = delete_data['leave_id']

        try:
            admin_card_leave = Leave_admin_card.objects.get(leave_id=pk)
            admin_card_leave.delete()
            return Response({"message": "Leave card record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Leave_admin_card.DoesNotExist:
            return Response({"error": "Leave card record not found"}, status=status.HTTP_404_NOT_FOUND)