from rest_framework.serializers import ModelSerializer, DateTimeField
from .models import Message, Client, Training, Invoice, Entry, Participant


class ClientSerializer(ModelSerializer):

    class Meta:
        model = Client
        fields = ('name', 'email', 'phone_number',
                  'newsletter_agreement', 'signup_agreement')
        extra_kwargs = {'signup_agreement': {'required': True}}


class ParticipantSerializer(ModelSerializer):

    class Meta:
        model = Participant
        fields = ('name', 'email')


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = ('sender', 'email', 'created_at', 'body', 'send')


class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = Invoice
        fields = ('institution_name', 'institution_address', 'phone_number', 'email', 'nip')


class TrainingSerializer(ModelSerializer):

    class Meta:
        model = Training
        fields = ('name', 'level', 'date', 'id',)

    date = DateTimeField(format="%H:%M - %d.%m.%Y")


class EntrySerializer(ModelSerializer):
    reporting_person = ClientSerializer()
    participants = ParticipantSerializer(many=True)
    invoice = InvoiceSerializer(required=False)

    class Meta:
        model = Entry
        fields = ('training', 'reporting_person',
                  'participants', 'invoice',)

    def create(self, validated_data):
        reporting_person = Client.objects.create(**validated_data.pop('reporting_person'))
        reporting_person_is_participating = validated_data.get('reporting_person_is_participating')
        training = validated_data.pop('training')

        data = {'reporting_person': reporting_person,
                'training': training
                }

        if validated_data.get('invoice'):
            invoice = Invoice.objects.create(**validated_data.pop('invoice'))
            data['invoice'] = invoice

        entry = Entry.objects.create(**data)

        clients = []

        if reporting_person_is_participating:
            clients.append(reporting_person)

        for participant in validated_data.get('participants'):
            clients.append(Participant.objects.create(**participant))

        entry.participants.set(clients)

        return entry

