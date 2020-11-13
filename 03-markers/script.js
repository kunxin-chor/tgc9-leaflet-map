// lat lng of Singapore
let singapore = [1.29, 103.85];
let map = L.map('map').setView(singapore, 13);

// go to mapbox.com if we want to apply for our token
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// ADDING MARKERS
let singaporeMarker = L.marker([1.29, 103.85]);
singaporeMarker.addTo(map);
singaporeMarker.bindPopup(`
<div>
<h1>Singapore</h1>
<p>Founded by Sir Stamford Raffles in 1819....</p>
</div>`)

let bttimah = L.marker([1.329, 103.80]).addTo(map);

let fortCanning = L.marker([1.2939, 103.8466]);
map.addLayer(fortCanning);
fortCanning.addEventListener('click', function(){
    alert("Welcome to Fort Canning");
})

let circle = L.circle([1.285, 103.822], {
    'color': 'green',
    'radius': 500
});

circle.addTo(map);
circle.bindPopup("<h1>Tiong Bahru Estate</h1>")
// map.addLayer(circle)

map.on('click', function(e){
    console.log(e.latlng);
})