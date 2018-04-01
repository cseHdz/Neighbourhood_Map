
// All Icons from http://www.icons-land.com

var initialMarkers = [
  {title: 'CN Tower', location: {lat: 43.6425662, lng: -79.3892455}},
  {title: 'CF Eaton Centre', location: {lat: 43.6544421, lng: -79.3828881}},
  {title: 'Nathan Phillips Square', location: {lat: 43.6525524, lng: -79.3857005}},
  {title: 'Air Canada Centre', location: {lat: 43.64347, lng: -79.3812876}},
  {title: 'TIFF Bell Lightbox', location: {lat: 43.6465334, lng: -79.3925969}}
];

///////////////////////
// Google Maps API
//////////////////////

var map;

// Empty array for all markers.
var markers = [];

function initMap() {

  var iconBase = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/';
  var icons = {
    default: {
      icon: iconBase + 'Map-Marker-Marker-Outside-Azure-icon.png'
    },
    highlighted: {
      icon: iconBase + 'Map-Marker-Marker-Outside-Chartreuse-icon.png'
    }
  };

  // Create new map centered around Toronto ON
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.650059, lng: -79.381629},
    zoom: 13
  });

  // InfoWindow to display marker details
  var largeInfowindow = new google.maps.InfoWindow();

  // Initialize the locations for Neighbourhood.
  for (var i = 0; i < initialMarkers.length; i++) {

    var position = initialMarkers[i].location;
    var title = initialMarkers[i].title;

    // Create a Google maps marker per location.
    var gmarker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: icons['default'].icon,
      id: i
    });
    // Push the marker into the markers array.
    markers.push(gmarker);

    // On Click event to display Infowindow with details
    gmarker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    // Add a highlight when user hovers over a marker
    gmarker.addListener('mouseover', function() {
      this.setIcon(icons['highlighted'].icon);
    });

    // Revert a marker to it's original status
    gmarker.addListener('mouseout', function() {
      this.setIcon(icons['default'].icon);
    });
  }

  document.getElementById('show-markers').addEventListener('click', function(){
      toggleMarkers('show');
  });

  document.getElementById('hide-markers').addEventListener('click', function(){
      toggleMarkers('hide');
  });
}

// Create an infoWindow to display the details of the marker
function populateInfoWindow(gmarker, infowindow) {
  // Check if infowindow is already open for this marker. Allow only one infowindow at a time.
  if (infowindow.gmarker != gmarker) {
    infowindow.gmarker = gmarker;
    infowindow.setContent('<div>' + gmarker.title + '</div>');
    infowindow.open(map, gmarker);
    // Release the infowindow if clicked.
    infowindow.addListener('closeclick', function() {
      infowindow.gmarker = null;
    });
    infowindow.open(map, gmarker);
  }
}

// Toggle visibility for all Markers in the Map. Adjust the map to ensure visbility of all markers.
function toggleMarkers(visibility) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markers.length; i++) {
    if (visibility == 'show'){
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    } else{
      markers[i].setMap(null);
    }
  }

  if (visibility == 'show'){
    map.fitBounds(bounds);
  }
}
