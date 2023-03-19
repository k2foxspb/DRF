from django.db import models


class Users(models.Model):
    user_name = models.CharField(max_length=32, verbose_name='nickname')
    first_name = models.CharField(max_length=32, verbose_name='name')
    last_name = models.CharField(max_length=32, verbose_name='surname')
    email = models.EmailField(unique=True, verbose_name='email')

    def __str__(self):
        return self.user_name


