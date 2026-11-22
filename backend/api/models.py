from django.db import models
from django.utils import timezone
from django.utils.html import strip_tags
from ckeditor.fields import RichTextField
from .slugging import unicode_slugify

class Work(models.Model):
    CATEGORY_CHOICES = [
        ('POEM', 'Poem'),
        ('SHORT_STORY', 'Short Story'),
        ('ESSAY', 'Essay'),
    ]

    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=255, unique=True, blank=True)
    author_name = models.CharField(
        max_length=200,
        blank=True,
        help_text="Author name for article metadata",
    )
    language = models.CharField(
        max_length=3,
        choices=[('ta', 'Tamil'), ('en', 'English'), ('mul', 'Multilingual')],
        default='ta',
        help_text="Primary language of this work",
    )
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    description = RichTextField(null=True, blank=True)
    excerpt = models.TextField(
        help_text="Automatically generated plain-text preview",
        default="",
        editable=False,
    )
    meta_description = models.CharField(
        max_length=320,
        blank=True,
        help_text="Optional search and sharing summary; plain text only",
    )
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES,
        default='ESSAY'
    )
    featured_image = models.ImageField(upload_to='works/', null=True, blank=True)
    reading_time = models.PositiveIntegerField(null=True, blank=True, help_text="Estimated reading time in minutes")
    publication_date = models.DateTimeField()
    is_published = models.BooleanField(
        default=False,
        help_text="Make this work publicly visible after review",
    )
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = unicode_slugify(self.title) or 'work'
            if base_slug.isdecimal():
                base_slug = f'work-{base_slug}'
            base_slug = base_slug[:255]
            slug = base_slug
            suffix = 2
            while Work.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                suffix_text = f'-{suffix}'
                slug = f'{base_slug[:255 - len(suffix_text)]}{suffix_text}'
                suffix += 1
            self.slug = slug

        plain_text = ' '.join(strip_tags(self.description or '').split())
        self.excerpt = (
            f'{plain_text[:199].rstrip()}…'
            if len(plain_text) > 200
            else plain_text
        )
        super().save(*args, **kwargs)

class Store(models.Model):
    name = models.CharField(max_length=200)
    website = models.URLField(
        null=True,
        blank=True,
        help_text="Store's website URL"
    )
    logo = models.ImageField(
        upload_to='store_logos/',
        null=True,
        blank=True,
        help_text="Store logo image"
    )

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(
        upload_to='book_covers/',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title

class BookStoreLink(models.Model):
    book = models.ForeignKey(
        Book, 
        on_delete=models.CASCADE,
        related_name='store_links'
    )
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    purchase_url = models.URLField(
        help_text="URL where the book can be purchased"
    )

    class Meta:
        verbose_name = "Store Link"
        verbose_name_plural = "Store Links"
        unique_together = ['book', 'store']

    def __str__(self):
        return f"{self.store.name} - {self.book.title}"
