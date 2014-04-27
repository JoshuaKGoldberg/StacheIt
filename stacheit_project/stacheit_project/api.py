from tastypie.resources import ModelResource
from authentication.models import Article, Stacher
# from authentication.models import Annotation
from tastypie import fields
from tastypie.authorization import DjangoAuthorization, Authorization
from django.contrib.auth.models import User

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        allowed_methods = ['get', 'post', 'put', 'delete']
        authorization = Authorization()

# class AnnotationResource(ModelResource):
#     user = fields.ToOneField(UserResource, 'owner', null=True)
#     class Meta:
#         queryset = Annotation.objects.all()
#         resource_name = "annotation"
#         allowed_methods = ['get', 'post', 'put', 'delete']
#         authorization = Authorization()


class ArticleResource(ModelResource):
    user = fields.ToOneField(UserResource, 'owner', null=True)
    # annotations = fields.ToManyField('stacheit_project.api.AnnotationResource', "annotation", null=True)
    class Meta:
        queryset = Article.objects.all()
        resource_name = 'article'
        allowed_methods = ['get', 'post', 'patch', 'put', 'delete']
        authorization = Authorization()

class StacherResource(ModelResource):
    class Meta:
        queryset = Stacher.objects.all()
        resource_name = "stacher"
        allowed_methods = ['get', 'post']
        # authorization = DjangoAuthorization()



   
