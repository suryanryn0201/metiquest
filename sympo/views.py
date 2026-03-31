from django.shortcuts import render
from .models import Event, Coordinator, Gallery, SiteSetting, Workshop

def index(request):
    # 1. Split events by category (keeping your time-based ordering)
    tech_events = Event.objects.filter(category='Technical').order_by('start_time')
    non_tech_events = Event.objects.filter(category='Non-Technical').order_by('start_time')
    
    # 2. Split coordinators
    faculty_coordinators = Coordinator.objects.filter(role='Faculty')
    fourth_year_coords = Coordinator.objects.filter(role='Student', year='4th Year')
    third_year_coords = Coordinator.objects.filter(role='Student', year='3rd Year')
    second_year_coords = Coordinator.objects.filter(role='Student', year='2nd Year')
    
    # 3. Gallery
    gallery_images = Gallery.objects.all().order_by('heading', '-uploaded_at')
    
    # 4. Settings / Registration Link
    settings = SiteSetting.objects.filter(is_active=True).first()
    sympo_reg_link = settings.sympo_registration_link if settings and settings.sympo_registration_link else "#"
    workshop_reg_link = settings.workshop_registration_link if settings and settings.workshop_registration_link else "#"
    workshops = Workshop.objects.all().order_by('date', 'start_time')

    # 5. Pass everything to the template
    context = {
        'tech_events': tech_events,      
        'non_tech_events': non_tech_events,
        'faculty_coordinators': faculty_coordinators,
        'fourth_year_coords': fourth_year_coords,
        'third_year_coords': third_year_coords,
        'second_year_coords': second_year_coords,
        'gallery_images': gallery_images,
        'workshops': workshops,
        'sympo_reg_link': sympo_reg_link, 
        'workshop_reg_link': workshop_reg_link,
    }
    
    return render(request, 'index.html', context)