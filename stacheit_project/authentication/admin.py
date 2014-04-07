from django.contrib import admin
from authentication.models import Stacher, Annotation, Article, StacherArticles, ArticleAnnotations

# Register your models here.

admin.site.register(Annotation)
admin.site.register(Stacher)
admin.site.register(Article)
admin.site.register(ArticleAnnotations)
admin.site.register(StacherArticles)