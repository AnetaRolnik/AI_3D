from django.views.generic import TemplateView

from ..models import Training, CourseLevel


class MainPage(TemplateView):
    template_name = "ai3d/index.html"

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['courses'] = CourseLevel.objects.values('name', 'slug')
        return data
