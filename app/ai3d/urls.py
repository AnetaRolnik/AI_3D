from django.urls import path

from .views.main_page import MainPage

app_name = 'ai3d'

urlpatterns = [
    path('', MainPage.as_view(), name='index')
]
