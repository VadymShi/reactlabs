from django.contrib import admin
from .models import Office, Worker, User

class OfficeAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')

admin.site.register(Office, OfficeAdmin)

class WorkerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'birth_date', 'hire_date', 'profession')

admin.site.register(Worker, WorkerAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'birth_date', 'is_staff', 'is_active')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    list_filter = ('is_staff', 'is_active', 'is_superuser')

admin.site.register(User, UserAdmin)
