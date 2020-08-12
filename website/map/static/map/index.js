/* Search Form Behaviour----------------------------------------------------------------------------------- */
// GLOBAL VARIABLES
var markers = [];
var nextMarkerId = 0;

// GEOCODE WHEN FORM SUBMITTED
var form = document.getElementsByClassName('search-form')[0];
form.addEventListener('submit', (e) => {
	e.preventDefault();
	// Fetch the longitude and latitude
	var data = new FormData();
	data.append('location', form.location.value);
	data.append('csrfmiddlewaretoken', form.csrfmiddlewaretoken.value);
	fetch('/map/geocode', {
		method: 'POST',
		body: data,
	})
	.then((response) => {
		// Response is not 200
		if (!response.ok) {
			// Geocoding API could not find the location
			if (response.status == 400) {
				alert('Location could not be found. Try something else.');
			}
			else {
				alert('Something went wrong. We don\'t know what it was');
			}
			return null;
		}
		else {
			return response.json()
		}
	})
    .then((responseJSON) => {
		if (responseJSON == null) {
			console.log('Something went wrong.');
		}
		else {
			latitude = parseFloat(responseJSON.latitude);
			longitude = parseFloat(responseJSON.longitude);
			makeMarker(mymap, latitude, longitude);	
		}
    });
})
/* -------------------------------------------------------------------------------------------------------- */

/* Marker Behaviour --------------------------------------------------------------------------------------- */
function makeMarker(map, latitude, longitude) {
	map.setView([latitude, longitude], 13);
	var marker = L.marker([latitude, longitude], { draggable: true, }).addTo(map);
	var popup = marker.bindPopup(makeMarkerPopupText(nextMarkerId));
	popup.openPopup();

	// Add custom submit event listener to form
	// .on('popupopen', addMarkerListener)
	// var form = document.querySelector(`form[data-id="${nextMarkerId}"]`);
	// form.addEventListener('submit', getIsochrone);

	// Store marker in global store and increment the id of the next marker
	markers.push({'marker': marker, 'markerId': nextMarkerId});
	nextMarkerId += 1;
}

function makeMarkerPopupText(nextMarkerId) {
	var csrfmiddlewaretoken = document.querySelector('input[name="csrfmiddlewaretoken"]').outerHTML;
	return `
		<b>You can click and drag this marker to move it around.</b><br>
		<form data-id=${nextMarkerId} method="GET" onsubmit="getIsochrone(event);">
			${csrfmiddlewaretoken}
			<label for="duration">Duration (mins):</label>
			<input type="number" name="duration" id="duration" max="30">
			<input type="submit" value="Generate Isochrone">
		</form>
	`
}

window.getIsochrone = function(e) {
	e.preventDefault();
	
};

/* -------------------------------------------------------------------------------------------------------- */

/* Initialise Map ----------------------------------------------------------------------------------------- */
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
/* -------------------------------------------------------------------------------------------------------- */
