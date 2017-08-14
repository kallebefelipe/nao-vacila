var alerta;
var geocoder;
var map;
var marker;
var latitude;
var longitude;
 
function initialize() {
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("map"), options);
 
    geocoder = new google.maps.Geocoder();
 
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });
 
    marker.setPosition(latlng);
	
	function carregarNoMapa(endereco) {
        geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
					alert(results[0].geometry.location.lat());
                    $('#enderecoAlerta').val(results[0].formatted_address);
 
                    var location = new google.maps.LatLng(latitude, longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(16);
                }
            }
        });
    }
	
	google.maps.event.addListener(marker, 'drag', function () {
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) { 
                    $('#enderecoAlerta').val(results[0].formatted_address);
                }
            }
        });
    });
	
	$("#enderecoAlerta").autocomplete({
        source: function (request, response) {
            geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                response($.map(results, function (item) {
					latitude = item.geometry.location.lat();
					longitude = item.geometry.location.lng();
                    return {
                        label: item.formatted_address,
                        value: item.formatted_address,
                        latitude: item.geometry.location.lat(),
                        longitude: item.geometry.location.lng()
                    }
                }));
            })
        },
        select: function (event, ui) {
            //$("#txtLatitude").val(ui.item.latitude);
            //$("#txtLongitude").val(ui.item.longitude);
            var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
            marker.setPosition(location);
            map.setCenter(location);
            map.setZoom(16);
        }
    });
}
 
initialize();
    

$("form").submit(function(event) {
	
	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
		// the user is logged in and has authenticated your
		// app, and response.authResponse supplies
		// the user's ID, a valid access token, a signed
		// request, and the time the access token 
		// and signed request each expire
		  
		uid = response.authResponse.userID;
		var accessToken = response.authResponse.accessToken;
		  
		  event.preventDefault();
		  alerta = JSON.stringify({
			  	titulo: $("#nomeAlerta").val(),
			  	endereco: $("#enderecoAlerta").val(),
				raio: $("#raioAlerta").val(),
			  	id_usuario: localStorage.getItem("id_usuario"),
				latitude: latitude,
				longitude: longitude
			});
		  
			$.ajax({
				type: "POST",
				url: "https://webserver-nao-vacila.herokuapp.com/alertas/",
				data: alerta,
				dataType: "json",
				contentType : "application/json"
			});
			return confirm("Alerta cadastrado com sucesso");
		  
	  } else if (response.status === 'not_authorized') {
		// the user is logged in to Facebook, 
		// but has not authenticated your app
		  alert('Você precisa se autenticar');
	  } else {
		// the user isn't logged in to Facebook.
		  alert('Você precisa estar logado para cadastrar alerta');
	  }
	 });
});