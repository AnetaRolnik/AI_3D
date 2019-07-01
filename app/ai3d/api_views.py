from rest_framework import generics, viewsets

from .models import Training
from .serializers import MessageSerializer, TrainingSerializer


class MessageApi(generics.CreateAPIView):
    serializer_class = MessageSerializer


class TrainingApi(generics.ListAPIView):
    serializer_class = TrainingSerializer

    def get_queryset(self):
        level_slug = self.kwargs.get('level')
        return Training.objects.filter(level__slug=level_slug)
