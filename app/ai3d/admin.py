from django.contrib import admin
from .models import Message, Client, Training, CourseLevel


class MessageAdmin(admin.ModelAdmin):
    model = Message
    list_display = ('sender', 'body', 'created_at')
    readonly_fields = ['sender', 'body', 'created_at']
    exclude = ['send', ]


class ClientAdmin(admin.ModelAdmin):
    model = Client


class TrainingAdmin(admin.ModelAdmin):
    model = Training
    ordering = ('date',)
    search_fields = ('level__name', 'name', 'date',
                     'participants__first_name', 'participants__last_name',)
    list_display = ['id', 'name', 'level', 'date', 'participants_list', ]
    exclude = ['sign_ups_closed', ]

    def participants_list(self, obj):
        return ", ".join([
            participant.get_full_name for participant in obj.participants.all()
        ])


class CourseLevelAdmin(admin.ModelAdmin):
    model = CourseLevel
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(CourseLevel, CourseLevelAdmin)

admin.site.site_header = "AI3D Admin Panel - A&J"
admin.site.site_title = "AI3D Admin Panel"
admin.site.index_title = "Welcome to AI3D Admin Panel"
