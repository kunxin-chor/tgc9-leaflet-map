async function main() {
  // lat lng of Singapore
  let singapore = [1.29, 103.85];
  let map = L.map("map").setView(singapore, 10);

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

  /* loading synchronously
  let hdbLayer = await createLayersFromJSON(map, "data/hdb.json");
  let mallLayer = await createLayersFromJSON(map, "data/malls.json");
  let natureLayer = await createLayersFromJSON(map, "data/nature.json");
  await applyGeoJSON(map, 'data/dengue.geojson');  
*/

  /* version 2: async, but not elegant
  let hdbRequest = createLayersFromJSON(map, "data/hdb.json");
  let mallRequest = createLayersFromJSON(map, "data/malls.json");
  let natureRequest = createLayersFromJSON(map, "data/nature.json");
  applyGeoJSON(map, "data/dengue.geojson");

  let hdbLayer = await hdbRequest;
  let mallLayer = await mallRequest;
  let natureLayer = await natureRequest;
*/

/* version 3: more elegant */
  let requests = [
    createLayersFromJSON(map, "data/hdb.json"),
    createLayersFromJSON(map, "data/malls.json"),
    createLayersFromJSON(map, "data/nature.json"),
    applyGeoJSON(map, "data/dengue.geojson")
  ];

  let layers = [];
  for (r of requests) {
    layers.push(await r);
  }

  let [hdbLayer, mallLayer, natureLayer] = layers;

  let baseLayers = {
    HDB: hdbLayer,
    Malls: mallLayer
  };

  let overlayLayers = {
    "Park & Nature": natureLayer
  };

  L.control.layers(baseLayers, overlayLayers).addTo(map);

  document
    .querySelector("#btn-toggle-parks")
    .addEventListener("click", function() {
      // if the map has the nature layer shown
      if (map.hasLayer(natureLayer)) {
        map.removeLayer(natureLayer);
      } else {
        map.addLayer(natureLayer);
      }
    });
}

async function createLayersFromJSON(map, jsonFile) {
  let response = await axios.get(jsonFile);

  let layer = L.layerGroup();
  for (let location of response.data) {
    L.marker(location.coordinates)
      .bindPopup(`<h1>${location.name}</h1>`)
      .addTo(layer);
  }
  return layer;
}

async function applyGeoJSON(map, jsonFile) {
  let response = await axios.get(jsonFile);
  L.geoJson(response.data, {
    color: "red"
  }).addTo(map);
}

main();
