from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from .models import Message, Client, Training, Invoice, Entry, Participant


class ClientSerializer(ModelSerializer):

    class Meta:
        model = Client
        fields = ('name', 'email', 'phone_number',
                  'newsletter_agreement', 'signup_agreement')


class ParticipantSerializer(ModelSerializer):

    class Meta:
        model = Participant
        fields = ('name', 'email')


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = ('sender', 'email', 'created_at', 'body', 'send')


class InvoiceSerializer(ModelSerializer):
    nip = CharField(
        required=False, allow_null=True, allow_blank=True)

    def validate_nip(self, value):
        if not value:
            return 0
        try:
            return int(value)
        except ValueError:
            raise ValidationError('You must supply an integer')

    class Meta:
        model = Invoice
        fields = ('institution_name', 'institution_address', 'phone_number', 'email', 'nip')


class TrainingSerializer(ModelSerializer):

    class Meta:
        model = Training
        fields = ('name', 'level', 'date', 'id',)


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
            client = Participant.objects.create(**participant)
            clients.append(client)

        entry.participants.set(clients)

        return entry

