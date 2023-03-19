from rest_framework import serializers

from TODO.models import Project, ToDo
from users.serializers import UsersSerializer


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = UsersSerializer
    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
