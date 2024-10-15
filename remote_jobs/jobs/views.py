from django.core.paginator import Paginator
from django.http import JsonResponse
from .models import Job
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework import viewsets, permissions
from rest_framework import viewsets, generics
from .serializers import UserSerializer, JobSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import requests
from django.shortcuts import render
from bs4 import BeautifulSoup
from django.utils import timezone
from datetime import timedelta
from django.middleware.csrf import get_token

# Job ViewSet for full CRUD support via Django Rest Framework
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-posted_at')  # Ensure queryset is ordered
    serializer_class = JobSerializer
    pagination_class = PageNumberPagination  # Use DRF's built-in pagination

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Custom Pagination for the List Jobs API
class JobPagination(PageNumberPagination):
    page_size = 10  # Set default page size
    page_size_query_param = 'page_size'  # Allow client to specify custom page size
    max_page_size = 100  # Limit the maximum page size

# Refactor list_jobs using DRF ListAPIView
class ListJobsView(generics.ListAPIView):
    queryset = Job.objects.all().order_by('-posted_at')  # Ensure queryset is ordered
    serializer_class = JobSerializer
    pagination_class = JobPagination  # Use custom pagination

    def get(self, request, *args, **kwargs):
        response = self.list(request, *args, **kwargs)  # Use DRF's built-in list functionality
        return Response({
            'jobs': response.data,  # Use DRF paginated data
            'total_pages': self.paginator.page.paginator.num_pages,
            'current_page': self.paginator.page.number,
            'has_next': self.paginator.page.has_next(),
            'has_previous': self.paginator.page.has_previous(),
        })

# Scraping GitHub and Indeed
def scrape_github_jobs():
    # Your GitHub scraping logic here
    return []

def scrape_indeed_jobs():
    # Your Indeed scraping logic here
    return []

def scrape_jobs(request):
    """Scrape jobs from multiple sources and combine the results."""
    
    github_jobs = scrape_github_jobs()
    indeed_jobs = scrape_indeed_jobs()

    # Combine job listings from both sources
    all_jobs = github_jobs + indeed_jobs
    
    # Optionally save the jobs in the database
    for job in all_jobs:
        Job.objects.create(
            title=job.get('title', 'N/A'),
            company=job.get('company', 'N/A'),
            description=job.get('description', 'N/A'),
            location=job.get('location', 'Remote'),
            url=job.get('url', ''),
            source=job.get('source', 'Unknown'),
            posted_at=job.get('posted_at', timezone.now()),
            date=job.get('date', None),
            time=job.get('time', None)
        )
    
    # Render the jobs in a template
    return render(request, 'jobs.html', {'jobs': all_jobs})

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})
