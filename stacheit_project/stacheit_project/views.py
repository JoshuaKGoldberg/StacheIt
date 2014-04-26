from __future__ import print_function
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from .forms import StacheUserCreationForm
from django.views.decorators.csrf import ensure_csrf_cookie
from authentication.models import Article, Stacher
# from authentication.models import Annotation
from django.utils.safestring import mark_safe
from django.utils.encoding import force_unicode
from alchemyapi import AlchemyAPI
import json

def login(request):
	c = {}
	c.update(csrf(request))
	return render_to_response('login.html', c)

def auth_view(request):
	username = request.POST.get('username', '')
	password = request.POST.get('password', '')
	user = auth.authenticate(username=username, password=password)

	if user is not None:
		auth.login(request, user)
		return HttpResponseRedirect('/accounts/loggedin')
	else:
		return HttpResponseRedirect('/accounts/invalid')

def loggedin(request):	
	if request.user:		
		articles = Article.objects.filter(owner = request.user)		

		for x in range(len(articles)):
			articles[x].content = articles[x].content[0:200]
	
		if request.user.is_active:
			return render_to_response('loggedin.html', {'full_name' : request.user.username, 'article_list' : articles})
		else:
			return HttpResponseRedirect('')

def invalid_login(request):
	return render_to_response('invalid_login.html')

def profile(request):
	if request.user:
		articles = Article.objects.filter(owner = request.user)
		stacher = Stacher.objects.filter(user = request.user)
		stacher = stacher[0]

		if request.user.is_active:
			return render_to_response('profile.html', { 'username' : request.user.username, 'email':stacher.email, 'date_created':stacher.date_created,
														'article_list' : articles })

###############################
# ARTICLE RENDERING
###############################
def escape(html):
    """Returns the given HTML with ampersands, quotes and carets encoded."""
    return mark_safe(force_unicode(html).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&#39;'));

def render_article(request):
	 if request.is_ajax():
		print('SUCCESS')
	 else:
		print('FAILURE')
		#articles = Article.objects.all();
		#content = articles[0].content; 
		testURL = "http://en.wikipedia.org/wiki/Squirrel";
		#Create AlchemyAPI Object
		alchemyapi = AlchemyAPI()
		print('')
		print('')	

		response = alchemyapi.text('url',testURL)
		titleData = alchemyapi.title('url', testURL)
		authorData = alchemyapi.author('url', testURL)
		if response['status'] == 'OK':
			#print('text: ', response['text'].encode('utf-8'))
			print('')
		else:
			print('Error in text extraction call: ', response['statusInfo'])

		return render_to_response('article.html', {'data' : response['text'].encode('utf-8'), 'titleText' : titleData['title'].encode('utf-8')}
 );

def update_article(request):
	print('HERE')
	if request.method == POST:
		print('SUCCESS')
	if request.newData:
		print('SUCCESS')
	else:
		print('NO SQUIRRELS')
	

def logout(request):

	auth.logout(request)
	c = {}
	c.update(csrf(request))
	return render_to_response('logout.html', c)

def register_user(request):
	form = StacheUserCreationForm()
	if request.method == "POST":
		form = StacheUserCreationForm(request.POST)
		if form.is_valid():
			form.save()
			return HttpResponseRedirect('/accounts/register_success/')
	args = {}
	args.update(csrf(request))
	args['form'] = form

	return render_to_response('register.html', args)

def register_success(request):
	return render_to_response('register_success.html')

def user_info(request):
  if request.user:
    if request.user.is_active:
      return render_to_response('user_info.html', {'username' : request.user.username, 'id' : request.user.id })
    
  return render_to_response('user_info.html')
