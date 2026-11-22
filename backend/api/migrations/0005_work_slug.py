import re
import unicodedata

from django.db import migrations, models


def unicode_slugify(value):
    value = unicodedata.normalize('NFKC', value).casefold()
    slug_parts = []

    for character in value:
        category = unicodedata.category(character)
        if category[0] in ('L', 'N', 'M'):
            slug_parts.append(character)
        else:
            slug_parts.append('-')

    return re.sub(r'-+', '-', ''.join(slug_parts)).strip('-')


def backfill_work_slugs(apps, schema_editor):
    Work = apps.get_model('api', 'Work')
    used_slugs = set()

    for work in Work.objects.order_by('pk').iterator():
        base_slug = unicode_slugify(work.title) or f'work-{work.pk}'
        if base_slug.isdecimal():
            base_slug = f'work-{base_slug}'
        base_slug = base_slug[:255]
        slug = base_slug
        suffix = 2

        while slug in used_slugs or Work.objects.filter(slug=slug).exclude(pk=work.pk).exists():
            suffix_text = f'-{suffix}'
            slug = f'{base_slug[:255 - len(suffix_text)]}{suffix_text}'
            suffix += 1

        Work.objects.filter(pk=work.pk).update(slug=slug)
        used_slugs.add(slug)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_work_seo_fields'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='slug',
            field=models.CharField(blank=True, default='', max_length=255),
            preserve_default=False,
        ),
        migrations.RunPython(backfill_work_slugs, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='work',
            name='slug',
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
    ]
