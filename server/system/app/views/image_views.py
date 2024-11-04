from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

import os
import boto3
import uuid

from app.serializers import ImageSerializer, FileSerializer
from app.models import Image
from django.http import StreamingHttpResponse

from system import settings
from app.util.response import ErrorResponse


class ImagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        images = Image.objects.filter(user_id=user.id)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)


class FileUploadView(generics.GenericAPIView):

    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, )

    def post(self, request):
        serializer = self.get_serializer(data=request.FILES)

        if not serializer.is_valid(raise_exception=False):
            # add first error to detail
            return ErrorResponse(serializer.errors['file'][0], status=status.HTTP_400_BAD_REQUEST)

        file = serializer.validated_data['file']
        file_extension = os.path.splitext(str(request.FILES['file']))[1]
        filename = str(uuid.uuid4()) + file_extension

        try:
            session = boto3.session.Session(
                aws_access_key_id=settings.S3_ACCESS_KEY,
                aws_secret_access_key=settings.S3_SECRET_KEY
            )

            s3_client = session.client(
                service_name='s3',
                endpoint_url=settings.S3_ENDPOINT_URL
            )

            s3_client.upload_fileobj(
                file,
                settings.S3_BUCKET_NAME,
                filename,
            )
        # TODO
        except Exception as e:
            return ErrorResponse('Failed to upload file', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        Image.objects.create(
            name=filename,
            user_id=request.user.id,
        )

        return Response({"detail": "Upload Successful"}, status=status.HTTP_200_OK)


class DownloadImageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, file_name):
        user = request.user
        # TODO
        image = Image.objects.get(name=file_name, user_id=user.id)

        if image is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_403_FORBIDDEN)

        try:
            session = boto3.session.Session(
                aws_access_key_id=settings.S3_ACCESS_KEY,
                aws_secret_access_key=settings.S3_SECRET_KEY
            )

            s3_client = session.client(
                service_name='s3',
                endpoint_url=settings.S3_ENDPOINT_URL
            )

            s3_object = s3_client.get_object(Bucket=settings.S3_BUCKET_NAME, Key=file_name)
            file_stream = s3_object['Body']

            response = StreamingHttpResponse(
                file_stream,
                content_type=s3_object['ContentType']
            )
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'
            response['Content-Length'] = s3_object['ContentLength']
            response['Cache-Control'] = 'max-age=2592000'

            return response


        # TODO
        except Exception as e:
            print(e)
            return ErrorResponse('Failed to fetch image', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

