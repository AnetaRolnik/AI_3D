# Generated by Django 2.0.9 on 2018-11-14 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0008_training_participants_limit'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='sign_ups_closed',
            field=models.BooleanField(default=False),
        ),
    ]
