from django.utils import timezone

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)