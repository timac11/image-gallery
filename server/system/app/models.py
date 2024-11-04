from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.TextField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    class Meta:
        ordering = ['created']
