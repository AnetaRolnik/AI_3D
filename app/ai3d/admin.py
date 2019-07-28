from django.contrib import admin
from .models import Message, Client, Training, CourseLevel, Invoice, Entry, Participant


class MessageAdmin(admin.ModelAdmin):
    model = Message
    list_display = ('sender', 'body', 'created_at')
    readonly_fields = ['sender', 'body', 'created_at']
    exclude = ['send', ]


class ClientAdmin(admin.ModelAdmin):
    model = Client


class InvoiceAdmin(admin.ModelAdmin):
    model = Invoice
    list_display = ['id', 'institution_name', 'training', ]

    def training(self, obj):
        return obj.invoice_applications.get()


class EntryAdmin(admin.ModelAdmin):
    model = Entry
    list_display = ['id', 'reporting_person', 'training', ]


class TrainingAdmin(admin.ModelAdmin):
    model = Training
    ordering = ('date',)
    search_fields = ('level__name', 'name', 'date',
                     'participants__name',)
    list_display = ['id', 'name', 'level', 'date', 'participants_list', ]
    exclude = ['sign_ups_closed', ]

    def participants_list(self, obj):
        return ", ".join([
            participant.name for participant in obj.participants.all()
        ])


class CourseLevelAdmin(admin.ModelAdmin):
    model = CourseLevel
    prepopulated_fields = {'slug': ('name',), }


class ParticipantAdmin(admin.ModelAdmin):
    model = Participant


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(CourseLevel, CourseLevelAdmin)
admin.site.register(Invoice, InvoiceAdmin)
admin.site.register(Entry, EntryAdmin)
admin.site.register(Participant, ParticipantAdmin)

admin.site.site_header = "AI3D Admin Panel - A&J"
admin.site.site_title = "AI3D Admin Panel"
admin.site.index_title = "Welcome to AI3D Admin Panel"
