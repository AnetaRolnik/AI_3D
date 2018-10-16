from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
    """ Client/Customer class - atm created after filling contact form  or signing up for training"""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_address = models.EmailField(max_length=70)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Message(models.Model):
    """ Base class for all messages used in app (ContactForm, Newsletter, etc)"""
    sender = models.ForeignKey(Client, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=250)
    send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender} - {self.body[:30]} - {self.created_at}'
