from django.urls import path

from rest_framework.routers import DefaultRouter

from .views.main_page import MainPage
from .api_views import MessageApi, TrainingViewSet

app_name = 'ai3d'

router = DefaultRouter()
router.register('trainings', TrainingViewSet, base_name='trainings')

urlpatterns = [
    path('', MainPage.as_view(), name='index'),
    path('message/', MessageApi.as_view(), name='message'),
]

urlpatterns += router.urls