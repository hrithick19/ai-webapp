from datetime import timedelta
from urllib.parse import quote
from xml.etree import ElementTree

from django.core.cache import cache
from django.test import TestCase
from django.utils import timezone

from .models import Work


class WorkSlugTests(TestCase):
    def create_work(self, title, **overrides):
        values = {
            'description': 'A sample literary work.',
            'publication_date': timezone.now(),
            'is_published': True,
        }
        values.update(overrides)
        return Work.objects.create(title=title, **values)

    def test_slug_supports_tamil_and_is_generated_from_title(self):
        title = 'விப்கோடிங் with Wibey'
        work = self.create_work(title)

        self.assertEqual(work.slug, 'விப்கோடிங்-with-wibey')
        self.assertIn('விப்கோடிங்', work.slug)

    def test_duplicate_titles_receive_unique_slugs(self):
        first = self.create_work('Tamil Writing')
        second = self.create_work('Tamil Writing')

        self.assertEqual(first.slug, 'tamil-writing')
        self.assertEqual(second.slug, 'tamil-writing-2')

    def test_slug_remains_stable_when_title_changes(self):
        work = self.create_work('Original title')
        original_slug = work.slug

        work.title = 'Updated title'
        work.save()

        self.assertEqual(work.slug, original_slug)

    def test_numeric_api_detail_and_slug_lookup_both_work(self):
        work = self.create_work('API compatibility')

        legacy_response = self.client.get(f'/api/works/{work.pk}/')
        slug_response = self.client.get(
            f'/api/works/by-slug/{quote(work.slug, safe="")}/'
        )

        self.assertEqual(legacy_response.status_code, 200)
        self.assertEqual(legacy_response.json()['slug'], work.slug)
        self.assertEqual(slug_response.status_code, 200)
        self.assertEqual(slug_response.json()['id'], work.pk)


class SitemapTests(TestCase):
    sitemap_namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9'

    def setUp(self):
        cache.clear()

    def create_work(self, title, **overrides):
        values = {
            'description': 'A sample literary work.',
            'publication_date': timezone.now(),
            'is_published': True,
        }
        values.update(overrides)
        return Work.objects.create(title=title, **values)

    def get_sitemap_locations(self):
        response = self.client.get('/sitemap.xml')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response['Content-Type'].startswith('application/xml'))

        root = ElementTree.fromstring(response.content)
        self.assertEqual(
            root.tag,
            f'{{{self.sitemap_namespace}}}urlset',
        )
        return {
            element.text
            for element in root.findall(
                f'{{{self.sitemap_namespace}}}url/{{{self.sitemap_namespace}}}loc'
            )
        }

    def test_sitemap_response_is_cached_for_ten_minutes(self):
        response = self.client.get('/sitemap.xml')

        self.assertIn('max-age=600', response.get('Cache-Control', ''))

    def test_sitemap_contains_static_pages_and_only_published_due_works(self):
        published = self.create_work('Published Tamil poem')
        draft = self.create_work(
            'Unpublished draft',
            is_published=False,
        )
        scheduled = self.create_work(
            'Scheduled future work',
            publication_date=timezone.now() + timedelta(days=1),
        )

        locations = self.get_sitemap_locations()

        self.assertIn('https://aharathi.in/', locations)
        self.assertIn('https://aharathi.in/works', locations)
        self.assertIn(
            f'https://aharathi.in/works/{quote(published.slug, safe="")}',
            locations,
        )
        self.assertNotIn(
            f'https://aharathi.in/works/{quote(draft.slug, safe="")}',
            locations,
        )
        self.assertNotIn(
            f'https://aharathi.in/works/{quote(scheduled.slug, safe="")}',
            locations,
        )
