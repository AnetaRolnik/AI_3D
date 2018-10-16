from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views.main_page import MainPage, ContactApi

app_name = 'ai3d'

urlpatterns = [
    path('', MainPage.as_view(), name='index'),
    path('contact', ContactApi.as_view(), name='contact')
]
urlpatterns = format_suffix_patterns(urlpatterns)
