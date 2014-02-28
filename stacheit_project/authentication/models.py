from django.db import models

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class Stacher(models.Model):
	user = models.OneToOneField(User)
	display_name = models.CharField(max_length=25)
	email = models.EmailField(max_length=75)
	date_created = models.DateTimeField(auto_now_add=True)

