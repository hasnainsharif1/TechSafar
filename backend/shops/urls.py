from django.urls import path
from . import views

urlpatterns = [
    # Shop endpoints
    path('', views.ShopListView.as_view(), name='shop-list'),
    path('<int:pk>/', views.ShopDetailView.as_view(), name='shop-detail'),
    
    # Shop review endpoints
    path('<int:shop_id>/reviews/', views.ShopReviewListView.as_view(), name='shop-review-list'),
    path('<int:shop_id>/reviews/create/', views.ShopReviewCreateView.as_view(), name='shop-review-create'),
] 