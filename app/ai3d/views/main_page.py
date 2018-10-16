from django.views.generic import TemplateView

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..forms.contact import ContactForm
from ..models import Client, Message


class MainPage(TemplateView):
    template_name = "ai3d/index.html"


class ContactApi(APIView):

    def post(self, request):
        data = request.data
        if ContactForm(data).is_valid():
            if not Client.objects.filter(email=data.get('email')).exists():
                client = Client(first_name=data.get('name'),
                                      last_name=data.get('last_name'),
                                      email=data.get('email'),
                                )
                client.save()
            else:
                client = Client.objects.get(email=data.get('email'))
            Message.objects.create(
                sender=client,
                body=data.get('message')
            )

            return Response(status=status.HTTP_201_CREATED)
        return Response(ContactForm(data).errors, status=status.HTTP_400_BAD_REQUEST)