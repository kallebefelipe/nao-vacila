var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var regioesData = new Array();
var divClone;

function initialize() {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
		center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), options);
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

$("form").submit(function(event) {
	event.preventDefault();
	
    enderecoPartida = $("#txtEnderecoPartida").val();
    enderecoChegada = $("#txtEnderecoChegada").val();
	var segredo = $("#segredo").val();
	//Na primeira vez salva div vazio
	if(segredo == ""){
		document.getElementById('segredo').value = "haha";
		divClone = $("#regioes-perigosas").clone();  
	}

    var request = {
        origin: enderecoPartida,
        destination: enderecoChegada,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
			$.ajax({
				type: "PUT",
				url: "https://webserver-nao-vacila.herokuapp.com/calcular_periculosidade/",
				data: JSON.stringify(result),
				dataType: "json",
				contentType : "application/json",
				success: function(result1){
					regioesData = JSON.stringify(result1);
					regioes();
				}
			});
            directionsDisplay.setDirections(result);
        }
    });
});

function regioes(){
	var p,t;
	var count = 1;
	document.getElementById('regioes-perigosas');
	$("#regioes-perigosas").replaceWith(divClone.clone());//reseta div
	for (var i = 0; i < regioesData.length; i++){
		if(regioesData[i] == 'r' && regioesData[i+1] == 'e' && regioesData[i+2] == 'g' && regioesData[i+3] == 'i'){
			p = document.createElement("p");
			t = document.createTextNode("Rota "+ count + " tem " + regioesData[i+19]+ " zonas de perigo");
			p.appendChild(t);
			document.getElementById("regioes-perigosas").appendChild(p);
			count++;
		}
   }
}