from django.urls import path
from .views import TodoListView, CustomTokenObtainPairView, CustomTokenRefreshView, logout, register, is_logged_in, get_username

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', logout),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('todos/', TodoListView.as_view(), name='todos'),
    path('register/', register),
    path('authenticated/', is_logged_in),
    path('get_username/<int:pk>/', get_username, name='get_username'),
]
