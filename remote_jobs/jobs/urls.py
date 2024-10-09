from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet)  # Register the JobViewSet with the router

urlpatterns = [
    path('', include(router.urls)),  # Include the router-generated URLs
]
