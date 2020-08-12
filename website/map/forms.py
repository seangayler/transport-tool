from django import forms

class GeocodingForm(forms.Form):
    location = forms.CharField(label='Location:', max_length=400)
    