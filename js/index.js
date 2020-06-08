
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
      mapTypeId: 'roadmap',
    //   mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });

    showStoreMarkers();
}


//function to show store markers
function showStoreMarkers() {
    // console.log(stores);
    stores.forEach(function(store, index){
       
         var latlng = new google.maps.LatLng(
             store.coordinates.latitude,
             store.coordinates.longitude);
        var name = store.name;
        var address = store.addressLines[0];
        createMarker(latlng, name, address);
    })
}


//function to create markers
function createMarker(latlng, name, address){
    var html = "<b>" + name+ "</b> <br />" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });

    markers.push(marker);
}

