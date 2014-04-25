from tastypie.resources import ModelResource
from authentication.models import Article, Stacher, Annotation
from tastypie import fields
from tastypie.authorization import DjangoAuthorization


class ArticleResource(ModelResource):
    owner = fields.ToOneField("stacheit_project.api.StacherResource", "stacher")
    annotations = fields.ToManyField('stacheit_project.api.AnnotationResource', "annotation")
    class Meta:
        queryset = Article.objects.all()
        resource_name = 'article'
        allowed_methods = ['get', 'post', 'put', 'delete']
	authorization = DjangoAuthorization()

class StacherResource(ModelResource):
    class Meta:
        queryset = Stacher.objects.all()
        resource_name = "stacher"
        allowed_methods = ['get', 'post']
	authorization = DjangoAuthorization()

class AnnotationResource(ModelResource):
    class Meta:
        queryset = Annotation.objects.all()
        resource_name = "annotation"
        allowed_methods = ['get', 'post', 'put', 'delete']
