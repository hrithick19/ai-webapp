from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BookViewSet, StoreViewSet,
    WorkViewSet
)

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'stores', StoreViewSet)
router.register(r'works', WorkViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 