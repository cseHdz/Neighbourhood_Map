var map;
function initMap() {
  // Create new map centered around Toronto ON
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.650059, lng: -79.381629},
    zoom: 13
  });
}
