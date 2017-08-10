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
                    latitude = results[0].geometry.location.lat();
                    longitude = results[0].geometry.location.lng();
 
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

	alerta = JSON.stringify({
				nome: $("#nomeAlerta").val(),
				raio: $("#raioAlerta").val(),
				endereco: $("#enderecoAlerta").val(),
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
});