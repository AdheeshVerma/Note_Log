from django.db import models
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission,User
from django.core.validators import RegexValidator 

from django.utils import timezone

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Note by {self.user.username} on {self.created_at.strftime('%Y-%m-%d')}"

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)    
    def __str__(self):
        return self.user.username

