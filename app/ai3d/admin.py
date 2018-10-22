from django.contrib import admin
from .models import Message, Client, Event


class MessageAdmin(admin.ModelAdmin):
    model = Message


class ClientAdmin(admin.ModelAdmin):
    model = Client


class EventAdmin(admin.ModelAdmin):
    model = Event


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Event, EventAdmin)
