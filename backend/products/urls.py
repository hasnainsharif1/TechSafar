from django.urls import path
from . import views

urlpatterns = [
    # Category endpoints
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Product endpoints
    path('', views.ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
    # Review endpoints
    path('<int:product_id>/reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('<int:product_id>/reviews/create/', views.ReviewCreateView.as_view(), name='review-create'),
] 