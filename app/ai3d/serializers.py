from rest_framework import serializers

from .models import Client, Message


class ClientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'email')


class MessageSerializer(serializers.ModelSerializer):

    sender = ClientSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ('sender', 'surname', 'body', '')

