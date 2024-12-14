from django.urls import path
from admin_dashboard.views import AdminViewSet, AdminCardViewSet

urlpatterns = [
    path('admin_leave/', AdminViewSet.as_view(), name='admin_leave_list'),  
    path('admin_card/', AdminCardViewSet.as_view(), name='admin_card_list'),
    path('admin_leave/<int:pk>/', AdminViewSet.as_view(), name='admin_leave_detail'),  
    path('admin_card/delete/<int:pk>/', AdminCardViewSet.as_view(), name='admin_card_delete'),  
]
