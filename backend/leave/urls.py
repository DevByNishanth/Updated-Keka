from django.urls import path
from leave.views import LeaveViewSet

# Define viewset actions
leave_list = LeaveViewSet.as_view({'get': 'get_leave_data'})
leave_get = LeaveViewSet.as_view({'post': 'approve_leave'})
leave_submit = LeaveViewSet.as_view({'post': 'submit_leave_form'})
leave_detail = LeaveViewSet.as_view({'get': 'get_leave_detail'})
leave_delete = LeaveViewSet.as_view({'delete': 'delete_leave_by_values'})
leave_update = LeaveViewSet.as_view({'put': 'update_leave'})
leave_approve = LeaveViewSet.as_view({'put': 'approve_leave'})

urlpatterns = [
    path('leave/', leave_list, name='leave-list'),
    path('leave/approve/', leave_get, name='approve_leave'),
    path('leave/submit/', leave_submit, name='submit_leave_form'),
    path('leave/<int:pk>/', leave_detail, name='get_leave_detail'),
    path('leave/delete/<int:pk>/', leave_delete, name='leave-delete-by-values'),
    path('leave/update/<int:pk>/', leave_update, name='leave-update'),
    path('leave/approve/<int:pk>/', leave_approve, name='approve_leave')
]