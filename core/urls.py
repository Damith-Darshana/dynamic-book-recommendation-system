from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet,UserRatingViewSet,BookReviewViewSet,UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import test_email, book_recommendation

router = DefaultRouter()

router.register('books', BookViewSet)
router.register('user-ratings', UserRatingViewSet )
router.register('book-reviews', BookReviewViewSet)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/token/', include('djoser.urls.jwt')),
    #path('auth/token/login/',TokenObtainPairView.as_view(),name='login'),
    path('', include(router.urls)),
    path('test-email/',test_email,name='test-email'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('recommend/',book_recommendation,name='book-recommendation'),
]

