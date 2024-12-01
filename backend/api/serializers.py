from rest_framework import serializers
from .models import Book, Store, BookStoreLink,Work

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'website', 'logo']

class BookStoreLinkSerializer(serializers.ModelSerializer):
    store = StoreSerializer(read_only=True)
    
    class Meta:
        model = BookStoreLink
        fields = ['id', 'store', 'purchase_url']

class BookSerializer(serializers.ModelSerializer):
    store_links = BookStoreLinkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Book
        fields = [
            'id', 
            'title',
            'subtitle', 
            'author', 
            'description', 
            'price', 
            'image',
            'store_links'
        ]

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = [
            'id',
            'title',
            'subtitle',
            'description',
            'excerpt',
            'category',
            'featured_image',
            'reading_time',
            'publication_date',
            'is_featured',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at'] 