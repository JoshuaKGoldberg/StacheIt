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

def render_article(request):	
	#if current aricle has content field
	#render as is
	#else call alchemy and save content
	article = Article.objects.get(id= 2)
	if article.content:
		return render_to_response('article.html', {'id' : article.id, 'data' : article.content, 'titleText' : article.title})
	else:				
		testURL = article.url
		#Create AlchemyAPI Object
		alchemyapi = AlchemyAPI()
		response = alchemyapi.text('url', testURL)
		titleData = alchemyapi.title('url', testURL)
		authorData = alchemyapi.author('url', testURL)
		article.content = response['text'].encode('utf-8')
		article.title = titleData['title'].encode('utf-8')
		article.save()

		return render_to_response('article.html', {'id' : article.id, 'data' : response['text'].encode('utf-8'), 'titleText' : titleData['title'].encode('utf-8')}
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
