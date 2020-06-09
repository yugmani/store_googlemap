
var map;
var markers = [];
var infoWindow;
var locationSelect;


//function to initialize the map
function initMap() {
    var losangeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
      center: losangeles,
      zoom: 11,
    });

    infoWindow = new google.maps.InfoWindow();
    //call displayStores function
    displayStores();
    //call showStoreMarkers function
    showStoreMarkers();
}


function displayStores() {
    var storesHtml = "";
    stores.forEach(function(store, index){
        // console.log(store);
        var address = store.addressLines;
        var phone = store.phoneNumber;
        console.log(address.length);
        storesHtml +=
        `<div class="store-container">
        <div class="store-info-container">
            <div class="store-address">`;
        
            if (address.length>2){
                storesHtml += `<span>${address[0]} ${address[1]}</span>
                <span>${address[2]}</span>`;
            }
            else {
                storesHtml += `<span>${address[0]}</span>
                <span>${address[1]}</span>`;
            }
                // <!-- <i class="fas fa-map-marker-alt"></i> -->
                storesHtml += `</div>
            <div class="store-phone-number"><i class="fas fa-phone-volume"></i>  ${phone}</div>
        </div>
            <div class="store-number-container">
                <div class="store-number">
                   ${index+1}
                </div>
            </div>
    </div>`;

    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
}


//function to show store markers
function showStoreMarkers() {
    var bounds = new google.maps.LatLngBounds();
        stores.forEach(function(store, index){
            // console.log(stores);
            var latlng = new google.maps.LatLng(
                        store.coordinates.latitude,
                        store.coordinates.longitude);
                // console.log(latlng);
            var name = store.name;
            var address = store.addressLines[0];
            var phone = store.phoneNumber;
            bounds.extend(latlng);
            createMarker(latlng, name, address, phone, index);
    })
    map.fitBounds(bounds);
}

//function to create markers
function createMarker(latlng, name, address, phone, index){
    var html = `<div id="info"><div id="description"><b>${name} <span>${index+1}<span></b><br />`;
    html += `${address}<br /></div>`;
    html += `<div id="ph"><i class="fas fa-phone-volume"></i> ${phone}</div></div>`;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });

    markers.push(marker);
}

