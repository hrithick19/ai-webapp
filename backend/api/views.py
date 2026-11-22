from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book, Store, Work
from .serializers import (
    BookSerializer, StoreSerializer,
    WorkSerializer
)

# Create your views here.

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

    def get_queryset(self):
        return self.queryset.filter(
            is_published=True,
            publication_date__lte=timezone.now(),
        ).order_by('-publication_date')

    @action(detail=False, methods=['get'], url_path=r'by-slug/(?P<slug>[^/.]+)')
    def by_slug(self, request, slug=None):
        work = get_object_or_404(self.get_queryset(), slug=slug)
        return Response(self.get_serializer(work).data)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
