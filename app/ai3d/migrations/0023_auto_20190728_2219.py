# Generated by Django 2.2.2 on 2019-07-28 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0022_auto_20190707_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='phone_number',
            field=models.TextField(blank=True, max_length=9),
        ),
    ]
