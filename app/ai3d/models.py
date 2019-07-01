from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import m2m_changed
from django.utils.text import slugify


class Client(models.Model):
    """ Client/Customer class - atm created after filling contact form  or signing up for training"""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=70)
    phone_number = models.CharField(max_length=9, blank=True)

    class Meta(object):
        unique_together = ('email',)

    def __str__(self):
        return f'{self.first_name.title()} {self.email}'

    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'


class Message(models.Model):
    """ Base class for all messages used in app (ContactForm, Newsletter, etc)"""
    sender = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=250)
    send = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.sender} - {self.body[:30]} - {self.created_at}'


class CourseLevel(models.Model):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=255)
    price = models.PositiveSmallIntegerField(null=True, default=0,
                                             help_text='Price in Polish Zloty [zł]')
    duration = models.PositiveSmallIntegerField(null=True, blank=True,
                                                help_text='Duration in hours')
    slug = models.SlugField(unique=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name}'


class Training(models.Model):
    name = models.CharField(max_length=60)
    level = models.ForeignKey(CourseLevel, on_delete=models.CASCADE, related_name='trainings')
    participants = models.ManyToManyField(Client, blank=True)
    participants_limit = models.PositiveSmallIntegerField(null=True, default=20)
    entry = models.ForeignKey('ai3d.Entry', on_delete=models.CASCADE, related_name='trainings_entries')
    place = models.CharField(max_length=355, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateTimeField()
    price = models.PositiveSmallIntegerField(null=True, default=0)
    sign_ups_closed = models.BooleanField(default=False)
    sign_ups_close_date = models.DateTimeField(null=True)

    # TODO price should depend of type of training (auto add in admin form)

    def __str__(self):
        return f'{self.name} - ({self.date.strftime("%d.%m.%Y %H:%M ")})  - {self.level.name}'

    def to_dict(self):
        return {
            'id': self.id,
            'data': self.date.strftime("%d.%m.%Y - %H:%M")
        }


class Entry(models.Model):
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='training_applications')
    invoice = models.ForeignKey('ai3d.Invoice', on_delete=models.CASCADE, related_name='invoice_applications', blank=True,  null=True)
    reporting_person = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='reporting_person')
    participants = models.ManyToManyField(Client, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.pk} {self.training_name} - ({self.created_at.strftime("%d.%m.%Y %H:%M ")}'


class Invoice(models.Model):
    institution_name = models.CharField(max_length=355, blank=True, null=True)
    institution_address = models.CharField(max_length=355, blank=True, null=True)
    phone_number = models.CharField(max_length=9, blank=True)
    email = models.EmailField(max_length=70)
    nip = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.pk} {self.institution_name} - ({self.created_at.strftime("%d.%m.%Y %H:%M ")}'


def sign_up_for_training(sender, action='pre_add', **kwargs):
    instance = kwargs.get('instance')
    if instance.participants_limit <= instance.participants.count():
        instance.sign_ups_closed = True
        instance.save()
        raise ValidationError("You can't assign more clients than participants_limit")


m2m_changed.connect(sign_up_for_training, sender=Training.participants.through)
