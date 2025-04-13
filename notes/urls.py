from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('testing', views.index, name="index"),
    path('notes', views.notes, name="notes"),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('idk/', views.idk, name='idk'),
    path('inner_home', views.inner_home, name='inner_home'),
    path('save-note/', views.save_note, name='save_note'),
    path('edit-note/<int:note_id>/', views.edit_note, name='edit_note'),
    path('logout/', views.logout_view, name='logout'),
    path('notes/<int:note_id>/change-theme/', views.change_theme, name='change_theme'),
    path('transcribe/', views.transcribe_audio, name='transcribe'),
]