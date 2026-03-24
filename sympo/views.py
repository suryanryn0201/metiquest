from django.shortcuts import render
from .models import Event, Coordinator, Gallery, SiteSetting

def index(request):
    # 1. Split events by category (keeping your time-based ordering)
    tech_events = Event.objects.filter(category='Technical').order_by('start_time')
    non_tech_events = Event.objects.filter(category='Non-Technical').order_by('start_time')
    
    # 2. Split coordinators
    faculty_coordinators = Coordinator.objects.filter(role='Faculty')
    student_coordinators = Coordinator.objects.filter(role='Student')
    
    # 3. Gallery
    gallery_images = Gallery.objects.all().order_by('heading', '-uploaded_at')
    
    # 4. Settings / Registration Link
    settings = SiteSetting.objects.filter(is_active=True).first()
    reg_link = settings.registration_link if settings else "#"

    # 5. Pass everything to the template
    context = {
        'tech_events': tech_events,       # Replaces 'events'
        'non_tech_events': non_tech_events, # New addition
        'faculty_coordinators': faculty_coordinators,
        'student_coordinators': student_coordinators,
        'gallery_images': gallery_images,
        'reg_link': reg_link,
    }
    
    return render(request, 'index.html', context)