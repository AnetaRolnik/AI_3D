# Generated by Django 2.2.2 on 2019-07-07 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0020_auto_20190702_2053'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='email',
            field=models.CharField(default=' ', max_length=100),
            preserve_default=False,
        ),
    ]
