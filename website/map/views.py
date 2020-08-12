from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from .forms import GeocodingForm
import requests

@login_required
def index(request):
    return render(request, 'map/index.html', {'form': GeocodingForm})

@login_required
def geocode(request):
    form = GeocodingForm(data=request.POST)
    if form.is_valid():
        query = form.cleaned_data['location']
        parameter = 'format=json'
        URL = 'https://nominatim.openstreetmap.org/search/' + query + '?' + parameter
        
        # Check if API cannot find location
        api_json_response = requests.get(url = URL).json()
        if len(api_json_response) == 0:
            return HttpResponse(status=400)
        
        api_json_response = api_json_response[0]
        longitude = api_json_response['lon']
        latitude = api_json_response['lat']
        return JsonResponse({'longitude': longitude, 'latitude': latitude})
    
    # Unknown error
    else:
        return HttpResponse(status=500)
        



