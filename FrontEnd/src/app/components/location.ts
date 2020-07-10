
function getLocation() {

    if (!navigator.geolocation) {
        console.log('Não foi possível obter a sua geolocalização');
    }

    if (location.protocol != 'https:') {
        console.log('Só é permitido obter a geolocalização em sites https');
    }

    navigator.geolocation.getCurrentPosition(position => {

        let location = {
            latitude: position.coords.latitude.toFixed(5),
            longitude: position.coords.longitude.toFixed(5)
        }
    });

}
