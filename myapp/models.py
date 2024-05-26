from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)

    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # або інші обов'язкові поля

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='myapp_user_set',  # Додати related_name для уникнення конфлікту
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='myapp_user_set',  # Додати related_name для уникнення конфлікту
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )

    def __str__(self):
        return self.email

class Office(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)

class Worker(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    hire_date = models.DateField()
    profession = models.CharField(max_length=100)
    offices = models.ManyToManyField('Office', related_name='workers')
