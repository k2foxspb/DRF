from config.users.models import Users
from config.users.serializers import UsersSerializer
from rest_framework.viewsets import ModelViewSet


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

