# Generated by Django 2.0.9 on 2018-11-14 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0007_auto_20181030_2006'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='participants_limit',
            field=models.PositiveSmallIntegerField(default=0, null=True),
        ),
    ]
