from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import login, authenticate,logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import RegisterForm
from .models import Note
from .forms import NoteForm
from django.utils import timezone
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
            return redirect('index')  # Redirect to the home page after registration
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