from django.urls import path

from .views.main_page import MainPage

urlpatterns = [
    path('', MainPage.as_view())
]
