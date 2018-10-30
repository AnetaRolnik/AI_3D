from django.contrib import admin
from .models import Message, Client, Training, Course


class MessageAdmin(admin.ModelAdmin):
    model = Message


class ClientAdmin(admin.ModelAdmin):
    model = Client


class TrainingAdmin(admin.ModelAdmin):
    model = Training


class CourseAdmin(admin.ModelAdmin):
    model = Course
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(Message, MessageAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(Course, CourseAdmin)
