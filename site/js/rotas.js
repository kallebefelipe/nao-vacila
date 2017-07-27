var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);
			
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$("#txtEnderecoPartida").val(results[0].formatted_address);
				}
            });
		});
	}
}

initialize();


var enderecoPartida;
var enderecoChegada; 

var dataRota;

/*$.getJSON( "http://webserver-nao-vacila.herokuapp.com/gerar_rota/?latitude_origem=-8.0264688&longitude_origem=-34.9177227&latitude_destino=-8.1368627&longitude_destino=-34.9115769", function( data ) {
    dataRota = data;
    
})*/

$("form").submit(function(event) {
	event.preventDefault();
    
	
    enderecoPartida = $("#txtEnderecoPartida").val();
    enderecoChegada = $("#txtEnderecoChegada").val();

    var request = {
        origin: enderecoPartida,
        destination: enderecoChegada,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            alert(JSON.stringify(result));
            //alert(JSON.stringify(dataRota));
            directionsDisplay.setDirections(result);
        }
    });
});
