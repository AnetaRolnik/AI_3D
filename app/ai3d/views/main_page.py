from django.views.generic import TemplateView

from rest_framework import status
from rest_framework.views import APIView

from ..serializers import MessageSerializer

class MainPage(TemplateView):
    template_name = "ai3d/index.html"


class ContactApi(APIView):

    def post(self, request, format=None):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)