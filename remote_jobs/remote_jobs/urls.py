from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework.routers import DefaultRouter
from jobs.views import ListJobsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lambda request: redirect('/admin/')),  # Redirect root URL to the admin page
    path('accounts/', include('allauth.urls')),
    path('jobs/', include('jobs.urls')),

]
