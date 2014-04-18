from django.contrib import admin
from authentication.models import Stacher
from authentication.models import Annotation, Article, StacherArticles, ArticleAnnotations

admin.site.register(Annotation)
admin.site.register(Stacher)
admin.site.register(Article)
admin.site.register(ArticleAnnotations)
admin.site.register(StacherArticles)