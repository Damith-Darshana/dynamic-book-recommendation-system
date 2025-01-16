from rest_framework import serializers
from .models import Book,UserRating,BookReview, UserProfile
from djoser.serializers import UserCreateSerializer
from .models import User

class CustomUserCreateSerializer(UserCreateSerializer):
  re_password = serializers.CharField(
    style={"input_type":"password"},write_only=True
  )
  class Meta(UserCreateSerializer.Meta):
    model = User
    fields = ('username', 'email', 'password', 're_password')
  
  def validate(self, attrs):
        # Perform validation for password and re_password fields
        if attrs["password"] != attrs["re_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

  def create(self, validated_data):
        validated_data.pop(
            "re_password"
        )  # Remove re_password field before creating the user
        return super().create(validated_data)

class BookReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
      model=BookReview
      fields='__all__'

class BookSerializer(serializers.ModelSerializer):
  reviews = BookReviewSerializer(many=True, read_only=True,source='bookreview_set')
  class Meta:
    model=Book
    fields='__all__'

class UserRatingSerializer(serializers.ModelSerializer):
  class Meta:
    model=UserRating
    fields='__all__'

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields='__all__'
