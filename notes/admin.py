from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Note

# Customize the Note model display in the admin panel
class NoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')  # Display these fields in the admin list view
    search_fields = ('user__username', 'content','title')  # Add search capability for user and content fields
    list_filter = ('created_at', 'updated_at')  # Add filters for creation and update dates

admin.site.register(Note, NoteAdmin)
