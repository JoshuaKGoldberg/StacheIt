from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
import authentication.views
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'stacheit_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('social_auth.urls')),
    # LOGGING IN AND OUT
    url(r'^$', 'stacheit_project.views.login'),
    url(r'^accounts/auth/$', 'stacheit_project.views.auth_view'),
    url(r'^accounts/logout/$', 'stacheit_project.views.logout'),
    url(r'^accounts/loggedin/$', 'stacheit_project.views.loggedin'),
    url(r'^accounts/invalid/$', 'stacheit_project.views.invalid_login'),
    url(r'^accounts/register/$', 'stacheit_project.views.register_user'),
    url(r'^accounts/register_success/$', 'stacheit_project.views.register_success'),
)


