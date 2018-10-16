from django.views.generic import TemplateView

from ..forms.contact import ContactForm


class MainPage(TemplateView):

    template_name = "ai3d/index.html"
    form_class = ContactForm
