// Create a static list of markers
var initialMarkers = [
          {title: 'CN Tower', location: {lat: 43.6425662, lng: -79.3892455}},
          {title: 'CF Eaton Centre', location: {lat: 43.6544421, lng: -79.3828881}},
          {title: 'Nathan Phillips Square', location: {lat: 43.6525524, lng: -79.3857005}},
          {title: 'Air Canada Centre', location: {lat: 43.64347, lng: -79.3812876}},
          {title: 'TIFF Bell Lightbox', location: {lat: 43.6465334, lng: -79.3925969}}];

// Define the model for marker
var marker = function(data) {
  this.title = data.title;
  this.location = new Location(data.location);
}

// Define the model for location
var location = function(data){
  this.lat = data.lat;
  this.lng = data.lng;
}

// Define the ViewModel
var ViewModel = function() {
  var self = this;
  this.markerList = ko.observableArray([]);

  initialMarkers.forEach(function(marker){
    self.markerList.push(new Marker(marker))
  })
}
