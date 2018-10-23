# Generated by Django 2.0.9 on 2018-10-22 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0003_auto_20181016_2049'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('place', models.CharField(blank=True, max_length=355, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('date', models.DateTimeField()),
                ('participants', models.ManyToManyField(blank=True, to='ai3d.Client')),
            ],
        ),
    ]