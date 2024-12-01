# Generated by Django 4.2.16 on 2024-12-01 11:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_storelink_remove_book_stores_alter_book_image_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookStoreLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_url', models.URLField(help_text='URL where the book can be purchased')),
            ],
            options={
                'verbose_name': 'Store Link',
                'verbose_name_plural': 'Store Links',
            },
        ),
        migrations.RemoveField(
            model_name='book',
            name='store_links',
        ),
        migrations.DeleteModel(
            name='StoreLink',
        ),
        migrations.AddField(
            model_name='bookstorelink',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='store_links', to='api.book'),
        ),
        migrations.AddField(
            model_name='bookstorelink',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.store'),
        ),
        migrations.AlterUniqueTogether(
            name='bookstorelink',
            unique_together={('book', 'store')},
        ),
    ]