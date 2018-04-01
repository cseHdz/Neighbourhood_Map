
//////////////////////////
// Knockout Data Handling
/////////////////////////


/*       Model        */
var Marker = function(data) {
  var self = this;

  self.title = data.title;
  self.location = new Location(data.location);
}

//Define the model for location
var Location = function(data){
  var self = this;

  self.lat = data.lat;
  self.lng = data.lng;
}

// Define the ViewModel
var ViewModel = function() {
  var self = this;

  self.markerList = ko.observableArray([]);

  initialMarkers.forEach(function(marker){
    self.markerList.push( new Marker(marker) );
  });

  self.currentMarker = ko.observable();

  self.setCurrentMarker = function(clickedMarker){
    self.currentMarker(clickedMarker);
  };
}

ko.applyBindings(new ViewModel());
