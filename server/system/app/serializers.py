from django.contrib.auth.models import User
from rest_framework import serializers

from django.core.validators import FileExtensionValidator

from app.models import Image

MAX_IMAGE_FILE_SIZE_MB = 5  # 5 MB


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['created', 'name']


class FileSerializer(serializers.Serializer):
    file = serializers.ImageField()

    def validate_file(self, image):
        if not image.content_type.startswith('image'):
            raise serializers.ValidationError("File must be an image.")

        # 3. Validate file size (optional)
        max_file_size = MAX_IMAGE_FILE_SIZE_MB * 1024 * 1024
        if image.size > max_file_size:
            raise serializers.ValidationError(f"Image size should not exceed {max_file_size / (1024 * 1024)} MB.")

        return image
