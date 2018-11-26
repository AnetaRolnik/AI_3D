from django.contrib import admin
from .models import Message, Client, Training, Course


class MessageAdmin(admin.ModelAdmin):
    model = Message


class ClientAdmin(admin.ModelAdmin):
    model = Client


class TrainingAdmin(admin.ModelAdmin):
    model = Training
    ordering = ('date',)
    search_fields = ('type__name', 'name', 'date',
                     'participants__first_name', 'participants__last_name',)
    list_display = ['name', 'type', 'date', 'participants_list', ]

    def participants_list(self, obj):
        return ", ".join([
            participant.get_full_name for participant in obj.participants.all()
        ])


class CourseAdmin(admin.ModelAdmin):
    model = Course
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(Course, CourseAdmin)

admin.site.site_header = "AI3D Admin Panel - A&J"
admin.site.site_title = "AI3D Admin Panel"
admin.site.index_title = "Welcome to AI3D Admin Panel"
