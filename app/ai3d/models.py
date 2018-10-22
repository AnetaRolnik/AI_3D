from django.db import models


class Client(models.Model):
    """ Client/Customer class - atm created after filling contact form  or signing up for training"""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=70)

    class Meta(object):
        unique_together = ('email',)

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


class Event(models.Model):
    name = models.CharField(max_length=255)
    participants = models.ManyToManyField(Client, blank=True)
    place = models.CharField(max_length=355, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateTimeField()

    def __str__(self):
        return f'{self.name} - {self.date}'
