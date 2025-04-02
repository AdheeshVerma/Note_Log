from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')  
    search_fields = ('user__username', 'content','title')
    list_filter = ('created_at', 'updated_at')

admin.site.register(Note, NoteAdmin)
