from urllib.parse import quote
from xml.etree import ElementTree

from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.cache import cache_page

from api.models import Work


SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9'
ElementTree.register_namespace('', SITEMAP_NAMESPACE)


@cache_page(60 * 10)
def sitemap(request):
    urlset = ElementTree.Element(f'{{{SITEMAP_NAMESPACE}}}urlset')
    static_paths = ('/', '/works', '/books', '/about', '/contact')

    for path in static_paths:
        url_element = ElementTree.SubElement(
            urlset,
            f'{{{SITEMAP_NAMESPACE}}}url',
        )
        ElementTree.SubElement(
            url_element,
            f'{{{SITEMAP_NAMESPACE}}}loc',
        ).text = f'{settings.SITE_URL}{path}'

    published_works = Work.objects.filter(
        is_published=True,
        publication_date__lte=timezone.now(),
    ).only('slug', 'updated_at').order_by('pk')

    for work in published_works:
        url_element = ElementTree.SubElement(
            urlset,
            f'{{{SITEMAP_NAMESPACE}}}url',
        )
        ElementTree.SubElement(
            url_element,
            f'{{{SITEMAP_NAMESPACE}}}loc',
        ).text = f'{settings.SITE_URL}/works/{quote(work.slug, safe="")}'
        ElementTree.SubElement(
            url_element,
            f'{{{SITEMAP_NAMESPACE}}}lastmod',
        ).text = work.updated_at.isoformat()

    return HttpResponse(
        ElementTree.tostring(urlset, encoding='utf-8', xml_declaration=True),
        content_type='application/xml; charset=utf-8',
    )
