from django.contrib import admin

from .models import Image


class ImageAdmin(admin.ModelAdmin):
    list_display = ('created', 'name', 'user')
    search_fields = ('created', 'name', 'user')
    list_filter = ('created', 'name', 'user')


admin.site.register(Image, ImageAdmin)
