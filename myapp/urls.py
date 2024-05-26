from django.contrib import admin
from django.urls import path
from myapp.views import (
    RegisterView, LoginView, LogoutView, ChangePasswordView,
    WorkerCreateView, WorkerListView, AddWorkerView, AddOfficeView,
    WorkerListJsonView, OfficeListJsonView, GetCsrfTokenView, UserInfoView, OfficeDetailView, WorkerDetailView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('api/workers/', WorkerListJsonView.as_view(), name='worker_list_json'),
    path('api/offices/', OfficeListJsonView.as_view(), name='office_list_json'),
    path('api/offices/<int:id>/', OfficeDetailView.as_view(), name='office_detail'),
    path('api/get-csrf-token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('', WorkerListView.as_view(), name='home'),  # Домашня сторінка
    path('add_worker/', AddWorkerView.as_view(), name='add_worker'),
    path('add_office/', AddOfficeView.as_view(), name='add_office'),
    path('del_office/', OfficeListJsonView.as_view(), name='del_office'),
    path('worker_list/', WorkerListView.as_view(), name='worker_list'),
    path('api/user-info/', UserInfoView.as_view(), name='user_info'),
    path('api/add-office/', AddOfficeView.as_view(), name='add_office'),
    path('api/add-worker/', AddWorkerView.as_view(), name='add_worker'),
    path('api/workers/<int:id>/', WorkerDetailView.as_view(), name='worker_detail'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
