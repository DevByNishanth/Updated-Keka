# Generated by Django 5.1.3 on 2024-12-10 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='leave',
            name='user_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
