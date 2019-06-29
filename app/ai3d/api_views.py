from rest_framework import generics

from .serializers import MessageSerializer


class MessageApi(generics.CreateAPIView):
    serializer_class = MessageSerializer