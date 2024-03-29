from rest_framework import serializers

from TODO.models import Project, ToDo


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name')


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
