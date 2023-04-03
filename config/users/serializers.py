from rest_framework import serializers
from rest_framework.authtoken.admin import User

from users.models import Users


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'user_name', 'first_name', 'last_name', 'email')


class UserSerializerBase(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']