from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class User(AbstractUser):
  pass

class UserProfile(models.Model):
  user = models.OneToOneField(User,on_delete=models.CASCADE)
  bio=models.TextField(null=True,blank=True)
  profile_picture = models.ImageField(upload_to='profiles/',null=True,blank=True)

class Book(models.Model):
  title=models.CharField(max_length=255)
  author=models.CharField(max_length=255)
  # genre = models.CharField(max_length=255)
  isbn=models.CharField(max_length=13,unique=True,null=True,blank=True)
  cover_image=models.URLField(max_length=500,null=True,blank=True)
  publication_year=models.DateField(null=True,blank=True)
  # page_count=models.IntegerField(null=True,blank=True)
  publisher = models.CharField(max_length=255,null=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  # Add more fields as needed (e.g., ISBN, publication year, cover image)

class UserRating(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  book = models.ForeignKey(Book,on_delete=models.CASCADE)
  rating = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])

class BookReview(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  book = models.ForeignKey(Book,on_delete=models.CASCADE,related_name="reviews")
  review = models.TextField()

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now_add=True)

  


