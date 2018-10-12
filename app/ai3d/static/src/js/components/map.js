function map() {

    const mapBox = document.querySelector(".map");
    const bounds = [
        [16.873164, 52.357380],
        [16.973164, 52.457380]
    ];

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5ldGFyb2xuaWsiLCJhIjoiY2psaHZiNWNpMDV1ejNwbnZhdWk5MG00YyJ9.Cl8sUhYsFgjL653esbl4HQ';

    const map = new mapboxgl.Map({
        container: mapBox,
        style: 'mapbox://styles/anetarolnik/cjn4uob3s8h2v2rse37daey8t',
        center: [16.923164, 52.407380],
        zoom: 16.0,
        maxBounds: bounds
    });

    const geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [16.923164, 52.407380]
            },
            properties: {
                title: 'Akademia Inwentaryzacji 3D',
                description: 'ul. Lalalal x,<br>11-111 Poznań'
            }
        }]
    };

    // add markers to map
    geojson.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 30 }) // add popups
                .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
    });
}

export default map;