from django.views import View
from django.shortcuts import get_object_or_404, render
import json
from django.views.generic import TemplateView
from rest_framework import generics, permissions
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import User, Office, Worker
from .serializers import UserSerializer, OfficeSerializer, WorkerSerializer
from django.middleware.csrf import get_token
class WorkerCreateView(generics.CreateAPIView):
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

class WorkerListView(TemplateView):
    template_name = 'main/worker_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['workers'] = Worker.objects.all()
        return context

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def delete(self, request, *args, **kwargs):
        worker_id = kwargs.get('pk')
        worker = get_object_or_404(Worker, id=worker_id)
        worker.delete()
        return JsonResponse({'status': 'success'})

class WorkerListJsonView(View):
    def get(self, request, *args, **kwargs):
        workers = Worker.objects.all().values('id', 'first_name', 'last_name', 'birth_date', 'hire_date', 'profession')
        workers_list = list(workers)
        return JsonResponse(workers_list, safe=False)


class AddOfficeView(generics.CreateAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer

class OfficeDetailView(View):
    def delete(self, request, id, *args, **kwargs):
        office = get_object_or_404(Office, id=id)
        office.delete()
        return JsonResponse({'status': 'success'}, status=204)

class AddWorkerView(View):
    @method_decorator(csrf_exempt)
    def get(self, request):
        return render(request, 'main/add_worker.html')

    @method_decorator(csrf_exempt)
    def post(self, request):
        try:
            data = json.loads(request.body)
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            birth_date = data.get('birth_date')
            hire_date = data.get('hire_date')
            profession = data.get('profession')
            offices_ids = data.get('offices', [])
            offices = Office.objects.filter(id__in=offices_ids)

            worker = Worker.objects.create(
                first_name=first_name,
                last_name=last_name,
                birth_date=birth_date,
                hire_date=hire_date,
                profession=profession
            )
            worker.offices.set(offices)
            worker.save()

            return JsonResponse({'status': 'success', 'worker_id': worker.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
class OfficeListJsonView(View):
    def get(self, request, *args, **kwargs):
        offices = Office.objects.all().values('id', 'name', 'location')
        offices_list = list(offices)
        return JsonResponse(offices_list, safe=False)

    def delete(self, request, *args, **kwargs):
        office_id = kwargs.get('id')
        office = get_object_or_404(Office, id=office_id)
        office.delete()
        return JsonResponse({'status': 'success'}, status=204)


class OfficeListView(TemplateView):
    template_name = 'main/office_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['offices'] = Office.objects.all()
        return context

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

class WorkerDetailView(View):
    def delete(self, request, *args, **kwargs):
        worker_id = kwargs.get('id')
        worker = get_object_or_404(Worker, id=worker_id)
        worker.delete()
        return JsonResponse({'status': 'success'}, status=204)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    @csrf_exempt
    def post(self, request):
        data = request.data  # Використовуємо request.data замість request.body
        email = data.get('email')  # Використовуємо email замість username
        password = data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Logged in successfully'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=400)

class LogoutView(APIView):
    @csrf_exempt
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'})


class ChangePasswordView(APIView):
    @csrf_exempt
    def post(self, request):
        user = request.user
        data = request.data
        current_password = data.get('current_password')
        new_password = data.get('new_password')

        if user.is_authenticated:
            if user.check_password(current_password):
                user.set_password(new_password)
                user.save()
                return JsonResponse({'message': 'Password changed successfully'})
            else:
                return JsonResponse({'message': 'Current password is incorrect'}, status=400)
        else:
            return JsonResponse({'message': 'Authentication required'}, status=400)

class GetCsrfTokenView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'csrfToken': get_token(request)})

class UserInfoView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            user_info = {
                'username': user.username,
                'email': user.email,
            }
            return JsonResponse(user_info)
        else:
            return JsonResponse({'message': 'User is not authenticated'}, status=401)


class WorkerDetailView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def delete(self, request, *args, **kwargs):
        worker_id = kwargs.get('id')
        worker = get_object_or_404(Worker, id=worker_id)
        worker.delete()
        return JsonResponse({'status': 'success'}, status=204)