from django.urls import path
from admin_dashboard.views import AdminViewSet

urlpatterns = [
    path('admin_leave/', AdminViewSet.as_view(), name='admin_leave'),
    path('admin_leave/<int:pk>/', AdminViewSet.as_view()),
]