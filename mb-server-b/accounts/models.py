# from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    vote_movie = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='vote_users')