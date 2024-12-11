# Generated by Django 5.1.3 on 2024-12-11 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Leave_admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_id', models.IntegerField()),
                ('fromDate', models.DateField()),
                ('toDate', models.DateField()),
                ('leave_type', models.CharField(choices=[('Sick Leave', 'Sick Leave'), ('Casual Leave', 'Casual Leave'), ('Annual Leave', 'Annual Leave')], default='Sick Leave', max_length=50)),
                ('time_period', models.CharField(choices=[('fullDay', 'Full Day'), ('firstHalf', 'First Half'), ('secondHalf', 'Second Half')], default='fullDay', max_length=20)),
                ('notes', models.TextField(blank=True, null=True)),
                ('notify', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending', max_length=20)),
                ('user_id', models.IntegerField()),
                ('user_name', models.CharField(blank=True, max_length=200, null=True)),
                ('created_at', models.CharField(blank=True, max_length=200, null=True)),
                ('updated_at', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'verbose_name': 'Leave Request',
                'verbose_name_plural': 'Leave Requests',
            },
        ),
    ]