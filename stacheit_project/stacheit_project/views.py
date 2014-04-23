from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from .forms import StacheUserCreationForm

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
		if request.user.is_active:
			return render_to_response('loggedin.html', {'full_name' : request.user.username})
		else:
			return HttpResponseRedirect('')

def invalid_login(request):
	return render_to_response('invalid_login.html')

def profile(request):
	return render_to_response('profile.html');

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
      return render_to_response('user_info.html', {'username' : request.user.username})
    
  return render_to_response('user_info.html')