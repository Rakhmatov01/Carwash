from rest_framework import serializers
from .models import Carwash, CarwashService, CarwashRating, CarwashComment


class CarwashServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarwashService
        fields = ("id", "title", "description", "price", "is_active")


class CarwashCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = CarwashComment
        fields = ("id", "text", "created_at", "username")


class CarwashRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarwashRating
        fields = ("id", "score", "created_at", "updated_at")

    def validate_score(self, v):
        if not (1 <= v <= 5):
            raise serializers.ValidationError("score 1..5 bo‘lsin")
        return v


class CarwashSerializer(serializers.ModelSerializer):
    rating_avg = serializers.FloatField(read_only=True)
    rating_count = serializers.IntegerField(read_only=True)
    services = CarwashServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Carwash
        fields = ("id", "name", "address", "image", "owner", "rating_avg", "rating_count", "services", "created_at")
        read_only_fields = ("id", "owner", "rating_avg", "rating_count", "services", "created_at")