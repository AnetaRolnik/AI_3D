from django.urls import path

from .views.main_page import MainPage
from .api_views import MessageApi, TrainingApi, EntryApi

app_name = 'ai3d'

urlpatterns = [
    path('', MainPage.as_view(), name='index'),
    path('message/', MessageApi.as_view(), name='message'),
    path('trainings/<slug:level>/', TrainingApi.as_view(), name='trainings'),
    path('entry/', EntryApi.as_view(), name='entries'),
]

