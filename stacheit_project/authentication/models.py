from django.db import models

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.db.models import Model, BigIntegerField, CharField, DateTimeField,\
                             ForeignKey, IntegerField,\
                             ManyToManyField, SmallIntegerField, TextField, \
                             AutoField, OneToOneField
#Stacher maps to a user
#Each stacher can have  multiple articles 
#
class Stacher(models.Model):
	user = models.OneToOneField(User)
	display_name = models.CharField(max_length=25)
	email = models.EmailField(max_length=75)
	date_created = models.DateTimeField(auto_now_add=True)
	articles = models.ManyToManyField('Article', through="StacherArticles")

	def __str__(self):
		return self.display_name

class Annotation(models.Model):
	content = models.TextField()
	class_name = models.CharField(max_length=75)	
	owner = ForeignKey(Stacher)

	def __str__(self):
		return self.class_name

class Article(models.Model):
	owner = ForeignKey(Stacher)
	title = models.CharField(max_length=120)
	content = models.TextField()
	annotations = models.ManyToManyField(Annotation, through="ArticleAnnotations")

	def __str__(self):
		return self.title

class StacherArticles(models.Model):
	owner = models.ForeignKey(Stacher)
	article = models.ForeignKey(Article)
	date_created = models.DateTimeField(auto_now_add=True)	

class ArticleAnnotations(models.Model):
	article = ForeignKey(Article)
	annotation = ForeignKey(Annotation)