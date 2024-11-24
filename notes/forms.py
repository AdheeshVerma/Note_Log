from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Note

class NoteForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = ['title','content']
        widgets = {
            'title': forms.Textarea(attrs={'id': 'note-title', 'hidden': 'true'}),
            'content': forms.Textarea(attrs={'id': 'note-content', 'hidden': 'true'}),
        }

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
