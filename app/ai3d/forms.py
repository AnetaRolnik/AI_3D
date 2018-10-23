from django import forms

from .models import Course


class ContactForm(forms.Form):
    email = forms.EmailField(required=True)
    name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    message = forms.CharField(widget=forms.Textarea, required=True)


class TrainingSignUpForm(forms.Form):
    email = forms.EmailField(required=True)
    name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    phone_number = forms.RegexField(regex=r'^\+?1?\d{9,15}$')
    when = forms.DateTimeField(required=True)
    training = forms.ModelChoiceField(queryset=Course.objects.all())