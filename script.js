window.addEventListener('DOMContentLoaded', () => {

    let searchButton = document.querySelector('.map_section_information_search_arrow_container');
    let ipInput = document.querySelector('.map_section_information_search_container_input');
    let ipRegex = /^[0-9\.\/]+$/;

    let ipText = document.querySelector('.map_section_information_datas_data.ip');
    let locationText = document.querySelector('.map_section_information_datas_data.location');
    let timezoneText = document.querySelector('.map_section_information_datas_data.timezone');
    let ispText = document.querySelector('.map_section_information_datas_data.isp');

    let mymap = L.map('map_container').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZmV1a2EiLCJhIjoiY2txZ2NsM2p4MHhnMDJvc2NjemNobGh0OSJ9.TalgBBkGJ8gxtq9vZ57-tw'
    }).addTo(mymap);

    searchButton.addEventListener('click', () => {

        let ipAddress = ipInput.value;

        if(ipRegex.test(ipAddress)) {

            fetch(`https://geo.ipify.org/api/v1?apiKey=at_mJAaIyLWgdK8dGvoyjh3YfqWHl9au&ipAddress=${ipAddress}`).then((response) => {

                response.json().then((ipData) => {

                    ipText.innerText = ipData.ip;
                    locationText.innerText = `${ipData.location.country}, ${ipData.location.region}, ${ipData.location.city}`;
                    timezoneText.innerText = ipData.location.timezone;
                    ispText.innerText = ipData.isp;

                    let marker = L.marker([ipData.location.lat, ipData.location.lng]).addTo(mymap);
                    mymap.panTo(new L.LatLng(ipData.location.lat, ipData.location.lng));

                });
            });
        };
    });

});