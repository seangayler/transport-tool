from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import GeocodingForm
import requests

@login_required
def index(request):
    return render(request, 'map/index.html', {'form': GeocodingForm})

@login_required
def geocode(request):
    form = GeocodingForm(data=request.POST)
    if form.is_valid():
        location = form.cleaned_data['location']



