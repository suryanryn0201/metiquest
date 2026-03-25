from django.contrib import admin
from .models import Coordinator, Event, Gallery, SiteSetting, Workshop

@admin.register(Coordinator)
class CoordinatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'year', 'contact_number')
    list_filter = ('role', 'year')
    search_fields = ('name', 'contact_number')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'venue', 'start_time', 'end_time', 'max_members')
    list_filter = ('category', 'venue')
    search_fields = ('name',)
    filter_horizontal = ('coordinators',)

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('heading', 'uploaded_at')
    list_filter = ('heading',)

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    # Updated to reflect the new split links
    list_display = ('sympo_registration_link', 'workshop_registration_link', 'is_active')

@admin.register(Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    list_display = ('name', 'guest_lecturer', 'date', 'venue')
    list_filter = ('date', 'venue')