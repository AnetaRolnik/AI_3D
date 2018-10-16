from django.contrib import admin
from .models import Message, Client


class MessageAdmin(admin.ModelAdmin):
    model = Message


class ClientAdmin(admin.ModelAdmin):
    model = Client


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
