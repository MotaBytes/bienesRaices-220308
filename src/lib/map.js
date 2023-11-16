//doble () se autoinvoca
(function(){
    const lat = 20.2679601;
    const lon = -97.958196;
    const leafLetMap = L.map('map').setView([lat, lon], 16);
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        atribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(leafLetMap);

    marker = new L.marker([lat, lon], {
        draggable: true,
        autoPan: true,
    }).addTo(map);

    // obtener lat y lon swl marker
    marker.on('moveend', function(e){
        marker = e.target
        const position = marker.getLatLng()
        console.log(`El usuario soltó el marcador en las coordenadas: ${position.lat}, ${position.lng}`)
        map.panTo(new L.LatLng(position.lat, position.lng))
    })
    //TODO: Obtener información de la dirección física
        geocodeService.reverse().latlng(position, 13).run(function(error, result){
        console.log(`La info. calculada por geocoder al intentar hacer la georeferencia inversa es: ${result}`);
        marker.bind.Popup(result.address.LongLabel)
        document.querySelector('.street').textContent=result.address?.Address ?? '';
        document.querySelector('#street').value=result.address?.Address ?? '';
        document.querySelector('#lat').value=result.address?.Address ?? '';
        document.querySelector('#lng').value=result.address?.Address ?? '';

    })
})();