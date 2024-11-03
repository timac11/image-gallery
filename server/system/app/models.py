from django.db import models


class Image(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.UUIDField(auto_created=False)

    class Meta:
        ordering = ['created']