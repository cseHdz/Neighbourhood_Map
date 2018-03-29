var map;

// Empty array for all markers.
var markers = [];

// Array of currently displayed markers ONLY.
var shownMarkers = [];

function initMap() {
  // Create new map centered around Toronto ON
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.650059, lng: -79.381629},
    zoom: 13
  });

  // TODO: Implement Search box
  // Create searchbox to enable filtering by text
  //var searchBox = new google.maps.places.SearchBox(
      //document.getElementById('marker-search'));
  // Bias the searchbox to within the bounds of the map.
  //searchBox.setBounds(map.getBounds());

  // Define default and highlighted marker styles
  var defaultIcon = makeMarkerIcon('#082d68');
  var highlightedIcon = makeMarkerIcon('#ff0000');

  // InfoWindow to display marker details
  var largeInfowindow = new google.maps.InfoWindow();

  // Initialize the locations for Neighbourhood.
  for (var i = 0; i < initialMarkers.length; i++) {
      // Get the location dictionary from the marker .
      var location = initialMarkers[i].location;
      var title = initialMarkers[i].title;
      // Create a marker per location, and push into markers array.
      var marker = new google.maps.Marker({
        position: location,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });

      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the style when mouse hovers and leaves the marker area.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });

      document.getElementById('show-markers').addEventListener('click', funtion(){
          toggleMarkers('show')
      });

      document.getElementById('show-markers').addEventListener('click', funtion(){
          toggleMarkers('hide')
      });
  }
}

// Create an infoWindow to display the details of the marker
function populateInfoWindow(marker, infowindow) {
  // Check if infowindow is already open for this marker. Allow only one infowindow at a time.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Release the infowindow if clicked.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

// Toggle visibility for all Markers in the Map. Adjust the map to ensure visbility of all markers.
function toggleMarkers(visibility) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markers.length; i++) {
    if (visibility == 'show') {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
      map.fitBounds(bounds);
    }else {
      markers[i].setMap(null);
    }
  }
}

// Allow only filtered marker to be visible. Adjust the map to ensure visbility.
function filterMarker(title, visibility) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markers.length; i++) {
    if (markets[i].title == title) {
      if (visibility == 'show') {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
        map.fitBounds(bounds);
      }
    }else {
      markers[i].setMap(null);
    }
}
