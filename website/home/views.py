from django.shortcuts import render, redirect

def index(request):
    # Redirect logged in users
    if request.user.is_authenticated:
        return redirect('/map')

    return render(request, 'home/index.html')
