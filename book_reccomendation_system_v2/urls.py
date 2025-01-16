from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf import settings
from django.conf.urls.static import static

scema_view = get_schema_view(
  openapi.Info(
    title="Dynamic Book Recommendation System API",
    default_version='v1',
    description="API documentation for the Dynamic Book Recommendation System",
    terms_of_service="#",
    contact=openapi.Contact(email="damithdarshana.lap@gmail.com"),
    license=openapi.License(name="BSD License"),
  ),
  public=True,
  permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('core.urls')),
    path('swagger/',scema_view.with_ui('swagger',cache_timeout=0),name='schema-swagger-ui'),
    path('redoc/',scema_view.with_ui('redoc',cache_timeout=0),name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

