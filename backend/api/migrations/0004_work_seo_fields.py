from django.db import migrations, models
from django.utils.html import strip_tags


def publish_existing_works(apps, schema_editor):
    Work = apps.get_model('api', 'Work')
    Work.objects.all().update(is_published=True)


def refresh_work_excerpts(apps, schema_editor):
    Work = apps.get_model('api', 'Work')
    for work in Work.objects.all().iterator():
        plain_text = ' '.join(strip_tags(work.description or '').split())
        excerpt = (
            f'{plain_text[:199].rstrip()}…'
            if len(plain_text) > 200
            else plain_text
        )
        Work.objects.filter(pk=work.pk).update(excerpt=excerpt)


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_bookstorelink_remove_book_store_links_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='author_name',
            field=models.CharField(
                blank=True,
                help_text='Author name for article metadata',
                max_length=200,
            ),
        ),
        migrations.AddField(
            model_name='work',
            name='language',
            field=models.CharField(
                choices=[('ta', 'Tamil'), ('en', 'English'), ('mul', 'Multilingual')],
                default='ta',
                help_text='Primary language of this work',
                max_length=3,
            ),
        ),
        migrations.AddField(
            model_name='work',
            name='meta_description',
            field=models.CharField(
                blank=True,
                help_text='Optional search and sharing summary; plain text only',
                max_length=320,
            ),
        ),
        migrations.AddField(
            model_name='work',
            name='is_published',
            field=models.BooleanField(
                default=False,
                help_text='Make this work publicly visible after review',
            ),
        ),
        migrations.AlterField(
            model_name='work',
            name='excerpt',
            field=models.TextField(
                default='',
                editable=False,
                help_text='Automatically generated plain-text preview',
            ),
        ),
        migrations.RunPython(refresh_work_excerpts, migrations.RunPython.noop),
        migrations.RunPython(publish_existing_works, migrations.RunPython.noop),
    ]
