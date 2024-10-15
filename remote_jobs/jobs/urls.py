from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, UserViewSet
from . import views
from .views import csrf

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/csrf/', csrf),  # The view that returns the CSRF token
    
]