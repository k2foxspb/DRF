from django.db import models

from users.models import Users


class Project(models.Model):
    name = models.CharField(max_length=255)
    id = models.IntegerField(primary_key=True)


class ToDo(models.Model):
    name = models.ForeignKey(Project, on_delete=models.CASCADE)
    create = models.DateTimeField(auto_now_add=True, editable=False)
    update = models.DateTimeField(auto_now=True, editable=False)
    text = models.TextField()
