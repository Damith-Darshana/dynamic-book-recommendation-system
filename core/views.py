from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import generics

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Book, UserRating, BookReview,UserProfile
from .serializers import BookSerializer, UserRatingSerializer, BookReviewSerializer,UserProfileSerializer

from django.core.mail import send_mail
from django.http import HttpResponse


class BookPagination(PageNumberPagination):
    page_size = 12

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination
    filter_backends = [SearchFilter]
    search_fields = ['title','author']
    
    #fetch reviews for a specific book
    @action(detail=True, methods=['get'])
    def review(self, request, pk=None):
        book = self.get_object()
        reviews = BookReview.objects.filter(book=book)
        page = self.paginate_queryset(reviews)
        if page is not None:
            serializer = BookReviewSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = BookReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    @swagger_auto_schema(
        operation_description="Retrieve a list of books",
        responses={200:BookSerializer(many=True)},

        manual_parameters=[
            openapi.Parameter(
                'genre',
                openapi.IN_QUERY,
                description = 'Filter books by genre',
                type=openapi.TYPE_STRING,
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    

   

class UserRatingViewSet(viewsets.ModelViewSet):
    queryset = UserRating.objects.all()
    serializer_class = UserRatingSerializer

class BookReviewViewSet(viewsets.ModelViewSet):
    queryset = BookReview.objects.all()
    serializer_class = BookReviewSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset=UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile

def test_email(request):
    send_mail(
        subject="Test Email",
        message="This is a Test Email from my Django",
        from_email="admin@es.com",
        recipient_list=['user@hi.com'],
    )
    return HttpResponse("Test Email sent, Check the console")



# implementing the machine learning model part 
from django.http import JsonResponse
import pandas as pd
import pickle
import os
from django.conf import settings

books_data_path = os.path.join(settings.BASE_DIR, 'core', 'data_set', 'books_data_with_embeddings.csv')
cosine_sim_path = os.path.join(settings.BASE_DIR, 'core', 'data_set', 'cosine_sim.pkl')

#Load preprocessed data and cosine similarity matrix

books_data = pd.read_csv(books_data_path)
with open(cosine_sim_path,'rb') as f:
    cosine_sim = pickle.load(f)

#Recommendation function

def recommend_books(title, books_data, cosine_sim, top_n=5):
    title = title.lower().strip()
    try:
        idx = books_data[books_data['Book-Title'].str.lower() == title].index[0]
    except IndexError:
        return [{"error": "Book not found in dataset."}]

    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    top_indices = [i[0] for i in sim_scores[1:top_n+1]]
    
    # Return the recommended books
    return books_data.iloc[top_indices][['Book-Title', 'Book-Author', 'Publisher']].to_dict(orient="records")

# API view for recommendations
def book_recommendation(request):
    title = request.GET.get('title', '')
    if not title:
        return JsonResponse({"error": "Book title is required"}, status=400)

    recommendations = recommend_books(title, books_data, cosine_sim, top_n=5)
    return JsonResponse({"recommended_books": recommendations})
