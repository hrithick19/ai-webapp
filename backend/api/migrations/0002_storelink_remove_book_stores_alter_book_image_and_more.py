# Generated by Django 4.2.16 on 2024-12-01 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StoreLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_url', models.URLField(help_text='URL where the book can be purchased')),
                ('price', models.DecimalField(blank=True, decimal_places=2, help_text='Price in this store', max_digits=6, null=True)),
                ('is_available', models.BooleanField(default=True, help_text='Whether the item is currently available')),
            ],
        ),
        migrations.RemoveField(
            model_name='book',
            name='stores',
        ),
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='book_covers/'),
        ),
        migrations.AlterField(
            model_name='book',
            name='subtitle',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='store',
            name='name',
            field=models.CharField(max_length=200),
        ),
        migrations.DeleteModel(
            name='BookStore',
        ),
        migrations.AddField(
            model_name='storelink',
            name='store',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.store'),
        ),
        migrations.AddField(
            model_name='book',
            name='store_links',
            field=models.ManyToManyField(blank=True, to='api.storelink'),
        ),
    ]
