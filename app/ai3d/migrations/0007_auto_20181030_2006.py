# Generated by Django 2.0.9 on 2018-10-30 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0006_auto_20181023_2028'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='price',
            field=models.PositiveSmallIntegerField(default=0, help_text='Price in Polish Zloty [zł]', null=True),
        ),
    ]
