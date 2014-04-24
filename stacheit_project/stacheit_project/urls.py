from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
import authentication.views
from stacheit_project.api import ArticleResource, AnnotationResource, StacherResource
admin.autodiscover()

article_resource = ArticleResource()
annotation_resource = AnnotationResource()
stacher = StacherResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'stacheit_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    # LOGGING IN AND OUT
    url(r'^$', 'stacheit_project.views.login'),
    url(r'^accounts/auth/$', 'stacheit_project.views.auth_view'),
    url(r'^accounts/logout/$', 'stacheit_project.views.logout'),
    url(r'^accounts/loggedin/$', 'stacheit_project.views.loggedin'),
    url(r'^accounts/invalid/$', 'stacheit_project.views.invalid_login'),
    url(r'^accounts/profile/$', 'stacheit_project.views.profile'),
    url(r'^accounts/register/$', 'stacheit_project.views.register_user'),
    url(r'^accounts/register_success/$', 'stacheit_project.views.register_success'),
    url(r'^accounts/user_info/$', 'stacheit_project.views.user_info'),
    url(r'^api/', include(article_resource.urls)),
    url(r'^api/', include(annotation_resource.urls)),
    url(r'^api/', include(stacher.urls))
)


