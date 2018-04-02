
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

// Define the icons for the markers.
var iconBase = 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/';
var icons = {
  default: {
    icon: iconBase + 'Map-Marker-Marker-Outside-Azure-icon.png'
  },
  highlighted: {
    icon: iconBase + 'Map-Marker-Marker-Outside-Chartreuse-icon.png'
  }
};

// Empty array for all markers.
var markers = [];

var largeInfowindow;
function initMap() {

  // Create new map centered around Toronto ON
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.650059, lng: -79.381629},
    zoom: 13
  });

  // InfoWindow to display marker details
  largeInfowindow = new google.maps.InfoWindow();

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
      map: map,
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

  document.getElementById('map-filter').addEventListener('click', function(){
      filterMarkers();
  });

  document.getElementById('filter').addEventListener('keyup', function(e){
        filterMarkers();
  });
}

// Create an infoWindow to display the details of the marker
function populateInfoWindow(gmarker, infowindow) {

  var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='
                + gmarker.title + '&format=json&callback=wikiCallback';
  var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("failed to get wikipedia resources");
  }, 8000);

  $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      jsonp: "callback",
      success: function( response ) {
          var articleList = response[1];
          var content ='<h3>'+ gmarker.title + '</h3>' +
                        '<h4 id="wikipedia-header">Relevant Wikipedia Links</h4>' +
                        '<ul id="wikipedia-links" class="wikipedia-list">';

          for (var i = 0; i < articleList.length; i++) {
              articleStr = articleList[i];
              var url = 'http://en.wikipedia.org/wiki/' + articleStr;
              content = content + '<li><a href="' + url + '">' + articleStr + '</a></li>';
              console.log(content)
          };

          // Check if infowindow is already open for this marker. Allow only one infowindow at a time.
          if (infowindow.gmarker != gmarker) {
            viewModel = ko.dataFor(list);

            // Only update model once.
            if (viewModel.currentMarker().title != gmarker.title) {
              ko.dataFor(list).setCurrentMarker(getGMarker(gmarker));
            }
            infowindow.gmarker = gmarker;

            content = content + '</ul>';
            infowindow.setContent(content);
            infowindow.open(map, gmarker);
            // Release the infowindow if clicked.
            infowindow.addListener('closeclick', function() {
              infowindow.gmarker = null;
              gmarker.setIcon(icons['default'].icon);
              ko.dataFor(list).setCurrentMarker('');
            });

          clearTimeout(wikiRequestTimeout);
      }
    }
  });
}

function toggleMarker(marker, visibility){
  var bounds = new google.maps.LatLngBounds();
  if(marker.map == null && visibility == 'show'){
    marker.setMap(map);
    bounds.extend(marker.position);
  }else if (marker.map != null && visibility == 'hide'){
    marker.setIcon(icons['default'].icon);
    marker.setMap(null);
  }
}

// Trigger marker select programmatically
function selectMarkerFromVM(title){
  for (var i = 0; i < markers.length; i++) {
    // Display the marker with the title
    if (markers[i].title != title){
      markers[i].setIcon(icons['default'].icon);
    } else {
      // Make the marker visible on the map if hidden.
      toggleMarker(markers[i], 'show');
      // Highlight the selection.
      markers[i].setIcon(icons['highlighted'].icon);
      google.maps.event.trigger(markers[i], 'click');
    }
  }
}

// Toggle visibility for all Markers in the Map. Adjust the map to ensure visbility of all markers.
function toggleMarkers(visibility) {
  if (visibility == 'show'){
    filterMarkers();
  }else {
    ko.dataFor(list).setCurrentMarker('');
    for (var i = 0; i < markers.length; i++) {
      // Unhighlight all icons and remove from view.
      toggleMarker(markers[i],'hide');
    }
  }
}

// Filter all items.
function filterMarkers(){
  filter = document.getElementById('filter').value;
  var regExp = new RegExp('^' + filter + '');

  for (var i = 0; i < markers.length; i++) {
    if (filter && filter != "None" && !regExp.test(markers[i].title)){
      if(markers[i].title == ko.dataFor(list).currentMarker().title){
        ko.dataFor(list).setCurrentMarker('');
      }
      toggleMarker(markers[i],'hide');
    }else {
      toggleMarker(markers[i],'show');
    }
  }
}

// Helper function to communicate with View Model.
function getGMarker(gmarker){
  return ({
    title: gmarker.title,
    location: {
      lat:gmarker.position.lat(),
      lng:gmarker.position.lng()
    }
  });
}

function gm_authFailure() {
  alert('Unable to retrieve Google Maps Info, please try again later.');
  $("#map").css("display", "none");
}
