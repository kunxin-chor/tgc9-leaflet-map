function getRandomLatLng(map) {
  // get the boundaries (the rectangle boundary of what we are looking at)
  let bounds = map.getBounds();

  // get the four corners of the boundaries in lat,lng coordinates
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();

  // findd the length and breadth
  let lngSpan = northEast.lng - southWest.lng;
  let latSpan = northEast.lat - southWest.lat;

  // Math.random() will generate a decimal number between 0.0 to 1.0
  let randomLng = Math.random() * lngSpan + southWest.lng;
  let randomLat = Math.random() * latSpan + southWest.lat;

  return [randomLat, randomLng];
}

function fillMarkers(map) {
  let cluster = L.markerClusterGroup();
  for (let i = 0; i < 500; i++) {
    let coordinate = getRandomLatLng(map);
    L.marker(coordinate).addTo(cluster);
  }
  cluster.addTo(map);
}

// lat lng of Singapore
let singapore = [1.29, 103.85];
let map = L.map("map").setView(singapore, 15);

// go to mapbox.com if we want to apply for our token
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" //demo access token
  }
).addTo(map);

fillMarkers(map);
