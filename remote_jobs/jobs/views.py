from django.core.paginator import Paginator
from django.http import JsonResponse
from .models import Job
from rest_framework import viewsets, generics
from .serializers import UserSerializers, JobSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# Job ViewSet for full CRUD support via Django Rest Framework
class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    pagination_class = PageNumberPagination  # Use DRF's built-in pagination

# Custom Pagination for the List Jobs API
class JobPagination(PageNumberPagination):
    page_size = 10  # Set default page size
    page_size_query_param = 'page_size'  # Allow client to specify custom page size
    max_page_size = 100  # Limit the maximum page size

# Refactor list_jobs using DRF ListAPIView
class ListJobsView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    pagination_class = JobPagination  # Use custom pagination

    def get(self, request, *args, **kwargs):
        response = self.list(request, *args, **kwargs)  # Use DRF's built-in list functionality
        return Response({
            'jobs': response.data['results'],  # Extract jobs from paginated results
            'total_pages': response.data['total_pages'] if 'total_pages' in response.data else self.paginator.page.paginator.num_pages,
            'current_page': self.paginator.page.number,
            'has_next': self.paginator.page.has_next(),
        })
