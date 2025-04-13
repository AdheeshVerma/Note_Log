from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import login, authenticate,logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import RegisterForm
from .models import Note
from .forms import NoteForm
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from deepgram import Deepgram
from django.http import JsonResponse
import os

def transcribe_audio(request):
    if request.method == 'POST' and 'audio' in request.FILES:
        try:
            audio_file = request.FILES['audio']
            api_key = os.getenv('DEEPGRAM_API_KEY')
            
            if not api_key:
                return JsonResponse({'error': 'API key missing'}, status=500)

            dg_client = Deepgram(api_key)
            
            # Use SYNC_PRERECORDED method
            response = dg_client.transcription.sync_prerecorded(
                {'buffer': audio_file, 'mimetype': 'audio/wav'},
                {'punctuate': True}
            )
            
            return JsonResponse({
                'text': response['results']['channels'][0]['alternatives'][0]['transcript']
            })
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

# Create your views here.
def index(reqeust):
    return render(reqeust,"index.html")

def notes(reqeust):
    return render(reqeust,"note.html")
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('inner_home')  # Redirect to the home page after registration
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

# Login view
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('inner_home')  # Redirect to home page after login
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def save_note(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save(commit=False)
            note.user = request.user  # Associate the note with the current user
            note.created_at = timezone.now()  # Set the creation time
            note.save()  # Save the note
            return redirect('inner_home')  # Redirect to the home page or wherever you want
    else:
        form = NoteForm()
    
    return render(request, 'index.html')
    # return render(request, 'notes/note_form.html', {'form': form})

def idk(request):
    if request.user.is_authenticated:
        username = request.user.username
    else:
        username = None
    return render(request, 'note.html', {'username': username})

def inner_home(request):
    if request.user.is_authenticated:
        username = request.user.username
        user_notes = Note.objects.filter(user=request.user).order_by('created_at')
    else:
        username = None
        user_notes = []
    
    # Combine into a single context dictionary
    context = {
        'username': username,
        'user_notes': user_notes
    }

    return render(request, 'inner_home.html', context)

def edit_note(request, note_id):
    note = get_object_or_404(Note, id=note_id)

    if request.method == 'POST':
        # Update the note's title and content
        note.title = request.POST.get('title')
        note.content = request.POST.get('content')
        note.save()
        return redirect('inner_home')  

    return render(request, 'edit_note.html', {'note': note})
def logout_view(request):
    logout(request)  # This logs out the user
    return redirect('login')

@require_POST
def change_theme(request, note_id):
    theme = request.POST.get('theme')
    if theme in ['default', 'nature', 'abstract', 'minimal']:
        note = Note.objects.get(id=note_id)
        # Check if the user has permission to edit this note
        if note.user == request.user:  # Assuming notes have a user field
            note.theme = theme
            note.save()
            return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=400)