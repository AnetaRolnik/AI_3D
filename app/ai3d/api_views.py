from rest_framework import generics

from .models import Training
from .serializers import MessageSerializer, TrainingSerializer, EntrySerializer


class MessageApi(generics.CreateAPIView):
    serializer_class = MessageSerializer


class TrainingApi(generics.ListAPIView):
    serializer_class = TrainingSerializer

    def get_queryset(self):
        level_slug = self.kwargs.get('level')
        return Training.objects.filter(level__slug=level_slug)


class EntryApi(generics.CreateAPIView):
    serializer_class = EntrySerializer
