from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

def index(request):
    # Redirect logged in users
    if request.user.is_authenticated:
        return redirect('/map')

    context = {}
    form = UserCreationForm(None)
    context['form'] = form
    return render(request, 'register/index.html', context)

def create_user(request):
    context = {}
    form = UserCreationForm(request.POST)
    if request.method == "POST":
        if form.is_valid():
            user = form.save()
            login(request,user)
            return render(request,'map/index.html')
    context['form']=form
    return render(request,'register/index.html',context)