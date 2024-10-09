from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URL should be here
    path('jobs/', include('jobs.urls')),  # Include the jobs app's API URLs
]
