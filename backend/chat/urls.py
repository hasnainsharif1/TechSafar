from django.urls import path
from . import views

urlpatterns = [
    # Chat room endpoints
    path('rooms/', views.ChatRoomListView.as_view(), name='chat-room-list'),
    path('rooms/<int:pk>/', views.ChatRoomDetailView.as_view(), name='chat-room-detail'),
    
    # Message endpoints
    path('rooms/<int:chat_room_id>/messages/', views.MessageListView.as_view(), name='message-list'),
    path('rooms/<int:chat_room_id>/messages/create/', views.MessageCreateView.as_view(), name='message-create'),
] 