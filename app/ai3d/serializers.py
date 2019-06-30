from rest_framework.serializers import ModelSerializer
from .models import Message, Client, Training


class ClientSerializer(ModelSerializer):

    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'email', 'phone_number')

    def get_unique_together_validators(self):
        return []


class MessageSerializer(ModelSerializer):
    sender = ClientSerializer()

    class Meta:
        model = Message
        fields = ('sender', 'created_at', 'body', 'send')

    def create(self, validated_data):
        sender = validated_data.pop('sender')
        sender_obj, _ = Client.objects.get_or_create(**sender)
        message = Message.objects.create(sender=sender_obj, **validated_data)
        return message


class TrainingSerializer(ModelSerializer):

    class Meta:
        model = Training
        fields = ('participants',)

    def create(self, validated_data):
        pass


