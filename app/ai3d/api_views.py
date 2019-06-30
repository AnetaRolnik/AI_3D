from rest_framework import generics, viewsets

from .models import Training
from .serializers import MessageSerializer, TrainingSerializer


class MessageApi(generics.CreateAPIView):
    serializer_class = MessageSerializer


class TrainingViewSet(viewsets.ModelViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    http_method_names = ['get', 'put', 'head', 'options']


