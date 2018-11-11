from django.views.generic import TemplateView

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..forms import ContactForm, TrainingSignUpForm
from ..models import Client, Message, Training, Course


class MainPage(TemplateView):
    template_name = "ai3d/index.html"

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['courses'] = Course.objects.values('name', 'slug')
        data['trainings'] = Training.objects.values('name', 'date')
        return data


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

    @staticmethod
    def get_trainings(training_type, field_to_order_by='date'):
        """Trainings in specify type and sorted by date"""
        trainings_qs = Training.objects.filter(type__slug=training_type).order_by(field_to_order_by)
        return [t.to_dict() for t in trainings_qs]

    def post(self, request):
        data = request.data
        form = TrainingSignUpForm(data)
        if form.is_valid():
            return Response(status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, training_type=None):
        if not training_type:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(data=self.get_trainings(training_type),
                        status=status.HTTP_200_OK)


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
