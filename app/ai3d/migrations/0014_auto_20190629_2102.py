# Generated by Django 2.2.2 on 2019-06-29 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ai3d', '0013_auto_20190629_1941'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Course',
            new_name='CourseLevel',
        ),
        migrations.RemoveField(
            model_name='training',
            name='type',
        ),
        migrations.AddField(
            model_name='training',
            name='level',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='trainings', to='ai3d.CourseLevel'),
            preserve_default=False,
        ),
    ]
