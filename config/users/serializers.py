from rest_framework import serializers
from rest_framework.authtoken.admin import User

from users.models import Users


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class UserSerializerBase(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_name','first_name' )