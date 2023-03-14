from django.db import models

from users.models import Users


class Project(models.Model):
    name = models.CharField(max_length=255, verbose_name='name')
    repository = models.CharField(max_length=255)
    users = models.ManyToManyField(Users)
    description = models.TextField()


class ToDo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True, editable=False)
    update = models.DateTimeField(auto_now=True, editable=False)
    sign = models.BooleanField(default=True)
