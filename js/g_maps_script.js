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
}

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

// Initialize the locations for Neighbourhood
var locations = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];
