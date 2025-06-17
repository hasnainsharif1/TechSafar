from rest_framework import serializers
from .models import Shop, ShopReview, ShopImage

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields = ('id', 'image', 'is_primary')

class ShopReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.CharField(source='reviewer.username', read_only=True)

    class Meta:
        model = ShopReview
        fields = ('id', 'reviewer', 'reviewer_name', 'rating', 'comment', 'created_at', 'updated_at')
        read_only_fields = ('reviewer',)

class ShopSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    images = ShopImageSerializer(many=True, read_only=True)
    reviews = ShopReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = ('id', 'owner', 'owner_name', 'name', 'description', 'logo',
                 'cover_image', 'address', 'phone_number', 'email', 'website',
                 'business_hours', 'is_verified', 'rating', 'total_ratings',
                 'images', 'reviews', 'average_rating', 'created_at', 'updated_at')
        read_only_fields = ('owner', 'is_verified', 'rating', 'total_ratings')

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if not reviews:
            return 0
        return sum(review.rating for review in reviews) / len(reviews)

class ShopCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Shop
        fields = ('name', 'description', 'logo', 'cover_image', 'address',
                 'phone_number', 'email', 'website', 'business_hours', 'images')

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        shop = Shop.objects.create(**validated_data)
        
        for i, image in enumerate(images):
            ShopImage.objects.create(
                shop=shop,
                image=image,
                is_primary=(i == 0)  # First image is primary
            )
        
        return shop 