from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import BasePermission

from users.models import Users
from users.serializers import UsersSerializer, UserSerializerBase


class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    # permission_classes = [StaffOnly]

    def get_serializer_class(self):
        # versions
        if self.request.version == '0.2':
            return UsersSerializer
        return UserSerializerBase
