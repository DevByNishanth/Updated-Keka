from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Leave
from .serializers import LeaveSerializer

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override this method to restrict users to their own leave applications.
        """
        return Leave.objects.filter(user_id=self.request.user.id)

    @action(detail=True, methods=['post'])
    def approve_leave(self, request, pk=None):
        """
        Custom action to approve or reject leave by the reporting manager.
        """
        try:
            leave = Leave.objects.get(id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        # Assuming `approved_by` is a field in your Leave model (e.g., a ForeignKey to the manager)
        if request.user != leave.approved_by:
            return Response({'error': 'You are not authorized to approve this leave.'}, status=status.HTTP_403_FORBIDDEN)

        action = request.data.get('action')
        if action not in ['Approved', 'Rejected']:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        leave.status = action  # Assuming status is the field representing the approval state
        leave.save()  
        return Response({'message': f'Leave {action}'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_leave_data(self, request):
        """
        Custom action to get leave data for the authenticated user.
        """
        
        leave_data = Leave.objects.all()
       
        serialized_leave_data = LeaveSerializer(leave_data, many=True)
        return Response(serialized_leave_data.data)
    @action(detail=False, methods=['get'])
    def get_user_leave(self, request, pk=None):
        """
        Custom action to get leave data for the authenticated user.
        """       
        leave_data = Leave.objects.filter(user_id= pk)
        print(leave_data)
        serialized_leave_data = LeaveSerializer(leave_data, many=True)
        return Response(serialized_leave_data.data)
    
    @action(detail=False, methods=['delete'])
    def delete_leave_by_values(self, request, pk=None):
        """
        Custom action to delete a leave application by matching all provided field values.
        """
        
        
        try:
            # Filter the Leave records that match all the provided fields
            leave = Leave.objects.get(leave_id=pk)

           
            if not leave:
                return Response({'error': 'Leave record not found.'}, status=status.HTTP_404_NOT_FOUND)

            print(request.user.is_staff)
            if not request.user.is_staff:
                print("****************")
                return Response({'detail': 'You are not authorized to delete this leave.'}, status=status.HTTP_403_FORBIDDEN)
            

            # Delete the leave record
            leave.delete()

            return Response({'message': 'Leave application deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

   
    @action(detail=True, methods=['get'])
    def get_leave_detail(self, request, pk=None):
        """
        Custom action to get the leave details for a specific leave by its ID.
        """

        try:
            leave = Leave.objects.get(leave_id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        serialized_leave_data = LeaveSerializer(leave)
        return Response(serialized_leave_data.data)

    @action(detail=False, methods=['post'])
    def submit_leave_form(self, request):
        """
        Custom action to submit a leave application form.
        Accepts leave details and creates a new leave record.
        """
        
        serializer = LeaveSerializer(data=request.data)

        if serializer.is_valid():
            leave = serializer.save(user_id=request.user.id)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)  
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def update_leave(self, request, pk=None):
        """
        Custom action to update an existing leave application.
        """
        try:
            leave = Leave.objects.get(leave_id=pk)
        except Leave.DoesNotExist:
            return Response({'error': 'Leave not found'}, status=status.HTTP_404_NOT_FOUND)

        # Assuming only the user who created the leave can update it, or a staff member
        if leave.user_id != request.user.id and not request.user.is_staff:
            return Response({'error': 'You are not authorized to update this leave.'}, status=status.HTTP_403_FORBIDDEN)

        # Deserialize the data to update the leave record
        serializer = LeaveSerializer(leave, data=request.data, partial=True)  # partial=True allows updating specific fields
        if serializer.is_valid():
            serializer.save()  # Save the updated leave data
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def approve_leave(self, request, pk=None):
        try:
            leave_request = Leave.objects.get(leave_id=pk)
            new_status = request.data.get("status")
            if new_status in ["Approved", "Rejected"]:
                leave_request.status = new_status
                leave_request.save()
                return Response({"message": "Status updated successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        except Leave.DoesNotExist:
            return Response({"error": "Leave request not found"},status=status.HTTP_400_BAD_REQUEST)