# Generated by Django 3.1.7 on 2021-04-08 04:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_slot_booked'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='time_table',
            name='title',
        ),
    ]
