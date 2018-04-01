
//////////////////////////
// Knockout Data Handling
/////////////////////////

/*       Model        */
var Marker = function(data) {
  var self = this;
  self.title = data.title;
  self.location = new Location(data.location);

  return self;
}

//Define the model for location
var Location = function(data){
  var self = this;

  self.lat = data.lat;
  self.lng = data.lng;

  return self;
}

// Define the ViewModel
var ViewModel = function() {
  var self = this;
  self.markerList = ko.observableArray([]);
  self.filter = ko.observable('');
  self.currentMarker = ko.observable('');

  initialMarkers.forEach(function(marker){
    self.markerList.push(new Marker(marker));
  });

  self.visibleMarkers = ko.computed(function() {
    var filter = self.filter();
    if (!filter || filter == "None"){
        return self.markerList();
    } else {
        return ko.utils.arrayFilter(self.markerList(), function(marker) {
          var regExp = new RegExp('^' + self.filter() + '');
          return regExp.test(marker.title);
        });
    }
  });

  self.setCurrentMarker = function(clickedMarker){
    self.currentMarker(clickedMarker);
    if (clickedMarker != ''){
      selectMarkerFromVM(clickedMarker.title);
    }
  };

  // Update active state of button.
  self.isMarkerSelected = function(data){
    css = '';
    if (self.currentMarker().title === data.title){
      css = "active focus";
    }
    return css;
  }
}

ko.applyBindings(new ViewModel(initialMarkers));
