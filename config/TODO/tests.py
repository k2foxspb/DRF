import json
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer

import TODO
from users.models import Users
from users.views import UsersModelViewSet
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/todo/', {'text': 'trgnfnue'}, format='json')
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()

        request = factory.post('/api/users/', {"user_name": "wtrthrgwg",
                                               "first_name": "wtrrthgwrtg",
                                               "last_name": "wtrgrthtr",
                                               "email": "fkrejqr@mafoker.troi"}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = UsersModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestBookViewSet(APITestCase):

    def test_edit_mixer(self):
        user = mixer.blend(Users)
        User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/users/1/', {'user_name': 'kyio2fox'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = Users.objects.get(id=1)
        self.assertEqual(user.user_name, 'Руслан и Людмила')
