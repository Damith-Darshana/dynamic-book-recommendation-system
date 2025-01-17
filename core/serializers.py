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
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'bio', 'profile_picture', 'password']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        password = validated_data.pop('password', None)

        for attr, value in user_data.items():
            setattr(instance.user, attr, value)

        if password:
            instance.user.set_password(password)

        instance.user.save()
        return super().update(instance, validated_data)

