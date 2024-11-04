from django.urls import path
from .views.profile_views import ProfileView, LoginView, LogoutView
from .views.image_views import FileUploadView, ImagesView, DownloadImageView

urlpatterns = [
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('profile', ProfileView.as_view()),
    path('images', ImagesView.as_view()),
    path('images/<str:file_name>', DownloadImageView.as_view()),
    path('upload-file', FileUploadView.as_view()),
]
