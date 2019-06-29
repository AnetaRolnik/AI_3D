from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views.main_page import MainPage, TrainingApi
from .api_views import MessageApi

app_name = 'ai3d'

urlpatterns = [
    path('', MainPage.as_view(), name='index'),
    path('message/', MessageApi.as_view(), name='message'),
    path('training', TrainingApi.as_view(), name='training'),
    path('training/<slug:training_type>/', TrainingApi.as_view(), name='training')
]
urlpatterns = format_suffix_patterns(urlpatterns)