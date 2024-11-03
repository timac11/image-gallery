from django.urls import path
from .views.profile_views import ProfileView, LoginView, LogoutView

urlpatterns = [
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('profile', ProfileView.as_view()),
]
