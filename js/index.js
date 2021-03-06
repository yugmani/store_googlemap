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
    searchStores();
    setOnClickListener();
}


function searchStores (){
    var foundStores = [];
    var zipCode = document.getElementById("zip-code-input").value;
    if(zipCode){
        stores.forEach(function(store){
            var postal = store.address.postalCode.substring(0, 5);
            if(postal === zipCode){
                foundStores.push(store);
            }
        });
    } 
    else {
        foundStores = stores;
    }
    clearLocations();
    displayStores(foundStores);
    showStoreMarkers(foundStores);
    setOnClickListener()
}


function clearLocations(){
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}


function setOnClickListener(){
    
    var storeElements = document.querySelectorAll(".store-container");
    
    storeElements.forEach(function(elem, index){
        // console.log(elem+" "+index);
        elem.addEventListener("click", function(){
            google.maps.event.trigger(markers[index], 'click');
        })
    });
}


function displayStores(stores) {
    var storesHtml = "";
    stores.forEach(function(store, index){
        // console.log(store);
        var address = store.addressLines;
        var phone = store.phoneNumber;
        // console.log(address.length);

        storesHtml +=
        `<div class="store-container">
            <div class="store-container-background">
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
            </div>
    </div>`;

    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
}

//function to show store markers
function showStoreMarkers(stores) {
    var bounds = new google.maps.LatLngBounds();
        stores.forEach(function(store, index){
            // console.log(stores);
            var latlng = new google.maps.LatLng(
                        store.coordinates.latitude,
                        store.coordinates.longitude);
                // console.log(latlng);
            var name = store.name;
            var address = store.addressLines;
            var phone = store.phoneNumber;
            var openStatus = store.openStatusText;
            bounds.extend(latlng);
            createMarker(latlng, name, openStatus, address, phone, index);
    })
    map.fitBounds(bounds);
}

//function to create markers
function createMarker(latlng, name, openStatus, address, phone, index){
    
    var html = `<div class="info-store-window">
                    <div class="info-store-description">
                        <div class="info-store-name"><b>${name}</b></div>
                        <div class ="index-number">${index+1}</div>
                    </div>
                    <div class="info-store-details">
                        <div class="info-store-address"><i class="fas fa-location-arrow"></i> ${address[0]}</div>
                        <div class="info-store-status">${openStatus}</div>
                        <div class="info-store-phone"><i class="fas fa-phone-volume"></i> ${phone}</div>
                    </div>
                </div>`;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: `${index+1}`
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });

    markers.push(marker);
}

