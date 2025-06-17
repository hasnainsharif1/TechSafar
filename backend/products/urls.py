from django.urls import path
from . import views

urlpatterns = [
    # Category endpoints
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Brand endpoints
    path('brands/', views.BrandListView.as_view(), name='brand-list'),
    path('brands/featured/', views.FeaturedBrandListView.as_view(), name='featured-brand-list'),
    
    # Product endpoints
    path('', views.ProductListView.as_view(), name='product-list'),
    path('featured/', views.FeaturedProductListView.as_view(), name='featured-product-list'),
    path('daily-essentials/', views.DailyEssentialsListView.as_view(), name='daily-essentials-list'),
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
    # Review endpoints
    path('<int:product_id>/reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('<int:product_id>/reviews/create/', views.ReviewCreateView.as_view(), name='review-create'),
]