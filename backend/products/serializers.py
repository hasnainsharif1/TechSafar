from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'is_primary')

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'reviewer', 'reviewer_name', 'rating', 'comment', 'created_at', 'updated_at')
        read_only_fields = ('reviewer',)

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    brand_logo = serializers.ImageField(source='brand.logo', read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    discount_percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'seller', 'seller_name', 'category', 'category_name', 
                 'brand', 'brand_name', 'brand_logo', 'title', 'description', 
                 'price', 'original_price', 'discount_percentage', 'condition', 
                 'model', 'specifications', 'location', 'is_negotiable', 
                 'is_available', 'is_featured', 'is_daily_essential',
                 'views', 'images', 'reviews', 'average_rating', 'created_at', 'updated_at')
        read_only_fields = ('seller', 'views', 'discount_percentage')

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return 0
        return sum(review.rating for review in reviews) / len(reviews)

class ProductCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = ('category', 'brand', 'title', 'description', 'price', 'original_price',
                 'condition', 'model', 'specifications', 'location', 'is_negotiable',
                 'is_featured', 'is_daily_essential', 'images')

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        product = Product.objects.create(**validated_data)
        
        for i, image in enumerate(images):
            ProductImage.objects.create(
                product=product,
                image=image,
                is_primary=(i == 0)  # First image is primary
            )
        
        return product