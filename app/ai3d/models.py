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


class Course(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=255)
    price = models.PositiveSmallIntegerField(null=True, default=0,
                                             help_text='Price in Polish Zloty [zł]')
    duration = models.PositiveSmallIntegerField(null=True, blank=True,
                                                help_text='Duration in hours')

    def __str__(self):
        return f'{self.name}'


class Training(models.Model):
    name = models.CharField(max_length=60)
    type = models.ForeignKey(Course, on_delete=models.CASCADE)
    participants = models.ManyToManyField(Client, blank=True)
    place = models.CharField(max_length=355, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateTimeField()
    price = models.PositiveSmallIntegerField(null=True, default=0)
    # TODO price should depend of type of training (auto add in admin form)

    def __str__(self):
        return f'Name: {self.name} - Type:{self.type.name} - When: {self.date}'
