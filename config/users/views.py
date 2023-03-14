
from rest_framework.viewsets import ModelViewSet

from users.models import Users
from users.serializers import UsersSerializer


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
