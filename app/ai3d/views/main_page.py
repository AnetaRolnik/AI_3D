from django.views.generic import TemplateView

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..forms import ContactForm, TrainingSignUpForm
from ..models import Client, Message


class MainPage(TemplateView):
    template_name = "ai3d/index.html"


class ContactApi(APIView):

    def post(self, request):
        data = request.data
        form = ContactForm(data)
        if form.is_valid():
            Message.objects.create(
                sender=create_user_from_form(form),
                body=data.get('message')
            )
            return Response(status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class TrainingApi(APIView):

    def post(self, request):
        data = request.data
        form = TrainingSignUpForm(data)
        if form.is_valid():
            return Response(status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


def create_user_from_form(form):
    # if there is no user(1 user = 1 unique email) in db, user will be created.
    if not Client.objects.filter(email=form.data.get('email')).exists():
        client = Client(first_name=form.data.get('name'),
                        last_name=form.data.get('last_name'),
                        email=form.data.get('email'),
                        )
        client.save()
    else:
        client = Client.objects.get(email=form.data.get('email'))
    return client
