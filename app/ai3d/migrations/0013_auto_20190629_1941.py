# Generated by Django 2.2.2 on 2019-06-29 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0012_auto_20181208_1827'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='sign_ups_close_date',
            field=models.DateTimeField(null=True),
        ),
    ]
