from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Shop, ShopReview
from .serializers import ShopSerializer, ShopCreateSerializer, ShopReviewSerializer
from .permissions import IsShopOwnerOrReadOnly

class ShopListView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_verified']
    search_fields = ['name', 'description', 'address']
    ordering_fields = ['rating', 'created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ShopCreateSerializer
        return ShopSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ShopDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsShopOwnerOrReadOnly]

class ShopReviewCreateView(generics.CreateAPIView):
    queryset = ShopReview.objects.all()
    serializer_class = ShopReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        shop_id = self.kwargs.get('shop_id')
        serializer.save(
            reviewer=self.request.user,
            shop_id=shop_id
        )

class ShopReviewListView(generics.ListAPIView):
    serializer_class = ShopReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        shop_id = self.kwargs.get('shop_id')
        return ShopReview.objects.filter(shop_id=shop_id) 