document.addEventListener("DOMContentLoaded", function(){

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
        zoom: 14.0,
        maxBounds: bounds
    });

})