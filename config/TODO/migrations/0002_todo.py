# Generated by Django 4.1.7 on 2023-03-14 18:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TODO', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('create', models.DateTimeField(auto_now_add=True)),
                ('update', models.DateTimeField(auto_now=True)),
                ('sign', models.BooleanField(default=True)),
                ('project', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='TODO.project')),
            ],
        ),
    ]
