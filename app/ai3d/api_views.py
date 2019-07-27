from django.utils import timezone

from rest_framework import generics

from .models import Training
from .serializers import MessageSerializer, TrainingSerializer, EntrySerializer


class MessageApi(generics.CreateAPIView):
    serializer_class = MessageSerializer


class TrainingApi(generics.ListAPIView):
    serializer_class = TrainingSerializer

    def get_queryset(self):
        level_slug = self.kwargs.get('level')
        return Training.objects.filter(level__slug=level_slug,
                                       sign_ups_close_date__gt=timezone.now(),
                                       sign_ups_closed=False
                                       ).order_by('-date')


class EntryApi(generics.CreateAPIView):
    serializer_class = EntrySerializer

