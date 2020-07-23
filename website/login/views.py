from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login

# Create your views here.
def index(request):
    # Redirect logged in users
    if request.user.is_authenticated:
        return redirect('/map')

    context = {}
    form = AuthenticationForm()
    context['form'] = form
    context['next'] = '/map'
    return render(request, 'login/index.html', context)

def login_user(request):
    context = {}
    form = AuthenticationForm(data=request.POST)
    if request.method == "POST":
        if form.is_valid():
            login(request, form.get_user())
            return render(request,'map/index.html')
    context['form']=form
    return render(request,'login/index.html',context)