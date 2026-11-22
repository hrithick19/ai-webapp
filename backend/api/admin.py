from django.contrib import admin
from .models import Work, Book, Store, BookStoreLink

class BookStoreLinkInline(admin.TabularInline):
    model = BookStoreLink
    extra = 1
    autocomplete_fields = ['store']

@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'category', 'language', 'author_name', 'publication_date', 'is_published', 'is_featured']
    list_filter = ['category', 'language', 'is_published', 'is_featured']
    search_fields = ['title', 'slug', 'author_name', 'description', 'meta_description']
    readonly_fields = ['slug']

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ['name', 'website']
    search_fields = ['name']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'price']
    search_fields = ['title', 'author']
    inlines = [BookStoreLinkInline]

@admin.register(BookStoreLink)
class BookStoreLinkAdmin(admin.ModelAdmin):
    list_display = ['book', 'store', 'purchase_url']
    list_filter = ['store']
    search_fields = ['book__title', 'store__name']
    autocomplete_fields = ['book', 'store']



