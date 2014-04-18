# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
            # Adding model 'Stacher'
        db.create_table(u'authentication_stacher', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['auth.User'], unique=True)),
            ('display_name', self.gf('django.db.models.fields.CharField')(max_length=25)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal(u'authentication', ['Stacher'])
        # Adding model 'Article'
        db.create_table('authentication_article', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('owner', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Stacher'])),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=120)),
            ('content', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal('authentication', ['Article'])

        # Adding model 'ArticleAnnotations'
        db.create_table('authentication_articleannotations', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('article', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Article'])),
            ('annotation', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Annotation'])),
        ))
        db.send_create_signal('authentication', ['ArticleAnnotations'])

        # Adding model 'Annotation'
        db.create_table('authentication_annotation', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('content', self.gf('django.db.models.fields.TextField')()),
            ('class_name', self.gf('django.db.models.fields.CharField')(max_length=75)),
            ('owner', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Stacher'])),
        ))
        db.send_create_signal('authentication', ['Annotation'])

        # Adding model 'StacherArticles'
        db.create_table('authentication_stacherarticles', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('owner', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Stacher'])),
            ('article', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['authentication.Article'])),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
        ))
        db.send_create_signal('authentication', ['StacherArticles'])


    def backwards(self, orm):
        # Deleting model 'Article'
        db.delete_table('authentication_article')

        # Deleting model 'ArticleAnnotations'
        db.delete_table('authentication_articleannotations')

        # Deleting model 'Annotation'
        db.delete_table('authentication_annotation')

        # Deleting model 'StacherArticles'
        db.delete_table('authentication_stacherarticles')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'authentication.stacher': {
            'Meta': {'object_name': 'Stacher'},
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'display_name': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        'authentication.annotation': {
            'Meta': {'object_name': 'Annotation'},
            'class_name': ('django.db.models.fields.CharField', [], {'max_length': '75'}),
            'content': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'owner': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Stacher']"})
        },
        'authentication.article': {
            'Meta': {'object_name': 'Article'},
            'annotations': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['authentication.Annotation']", 'through': "orm['authentication.ArticleAnnotations']", 'symmetrical': 'False'}),
            'content': ('django.db.models.fields.TextField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'owner': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Stacher']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '120'})
        },
        'authentication.articleannotations': {
            'Meta': {'object_name': 'ArticleAnnotations'},
            'annotation': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Annotation']"}),
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Article']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'authentication.stacher': {
            'Meta': {'object_name': 'Stacher'},
            'articles': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['authentication.Article']", 'through': "orm['authentication.StacherArticles']", 'symmetrical': 'False'}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'display_name': ('django.db.models.fields.CharField', [], {'max_length': '25'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True'})
        },
        'authentication.stacherarticles': {
            'Meta': {'object_name': 'StacherArticles'},
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Article']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'owner': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['authentication.Stacher']"})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['authentication']