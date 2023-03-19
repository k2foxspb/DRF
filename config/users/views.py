from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import BasePermission

from users.models import Users
from users.serializers import UsersSerializer


class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    permission_classes = [StaffOnly]
