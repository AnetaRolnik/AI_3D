from rest_framework.serializers import ModelSerializer, BooleanField
from .models import Message, Client, Training, Invoice, Entry


class ClientSerializer(ModelSerializer):

    class Meta:
        model = Client
        fields = ('name', 'email', 'phone_number')


class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = ('sender', 'created_at', 'body', 'send')


class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = Invoice
        fields = ('institution_name', 'institution_address', 'phone_number', 'email', 'nip')


class TrainingSerializer(ModelSerializer):

    class Meta:
        model = Training
        fields = ('name', 'level', 'date', 'id',)


class EntrySerializer(ModelSerializer):
    reporting_person = ClientSerializer()
    participants = ClientSerializer(many=True)
    invoice = InvoiceSerializer()
    reporting_person_is_participating = BooleanField()

    class Meta:
        model = Entry
        fields = ('training', 'reporting_person',
                  'reporting_person_is_participating',
                  'participants', 'invoice',)

    def create(self, validated_data):
        reporting_person = Client.objects.create(**validated_data.pop('reporting_person'))
        reporting_person_is_participating = validated_data.get('reporting_person_is_participating')
        invoice = Invoice.objects.create(**validated_data.pop('invoice'))
        training = validated_data.pop('training')

        entry = Entry.objects.create(reporting_person=reporting_person,
                                    invoice=invoice, training=training)

        clients = []

        if reporting_person_is_participating:
            clients.append(reporting_person)

        for participant in validated_data.get('participants'):
            client = Client.objects.create(**participant)
            clients.append(client)

        entry.participants.set(clients)

        return entry

