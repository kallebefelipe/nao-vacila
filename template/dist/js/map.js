var map;
var infoWindow;
var markers = new Array();



// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = new Array();

//GET JSON OCORRENCIAS
$.getJSON( "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json", function( data ) {
    markersData = data;
    displayMarkers();
    createHeatMap();
	changeRadius();
	changeOpacity();
	changeDissipating();
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
})


function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(-8.017655, -34.944377),
      zoom: 9,
      mapTypeId: 'roadmap',
   };


   map = new google.maps.Map(document.getElementById('map'), mapOptions);

   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   //displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   //var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].latitude, markersData[i].longitude);
      var titulo = markersData[i].titulo;
      var data = markersData[i].data;
      var endereco = markersData[i].endereco;
      var tipo = markersData[i].id_tipo;

      createMarker(latlng, titulo, data, endereco, tipo);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      //bounds.extend(latlng);  
   }

   // Depois de criados todos os marcadores
   // a API através da sua função fitBounds vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida.
   //map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
var iconBase = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
function createMarker(latlng, titulo, data, endereco, tipo){
    /* Bloco de Decisão do tipo de marcador*/
    var marker;
    marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: titulo,
        icon: iconBase
    });

    var icone;
    switch(tipo){
        case "1":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');
            break;
        case "2":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            break;
        case "3":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            break;
        case "4":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png');
            break;
        case "5":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
            break;
        case "6":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png');
            break;
        case "7":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/pink-dot.png');
            break;
        case "8":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            break;
        case "9":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            break;
        case "10":

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            break;
        default:

            marker.setIcon(iconBase);

    }
 	markers.push(marker);
	
   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + titulo + '</div>' +
         '<div class="iw_content">' + data + '<br />' +
         endereco + '<br />' + '</div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}

// Função que cria o mapa de calor
function createHeatMap(){
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
		dissipating: true
    });
}

function getPoints(){
    var latlng = new Array();
    for (var i = 0; i < markersData.length; i++){
    	latlng.push( new google.maps.LatLng(markersData[i].latitude, markersData[i].longitude));
    }
    return latlng;
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function clearMarkers() {
    for(i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 4);
}

function changeDissipating() {
    heatmap.set('dissipating', heatmap.get('dissipating') ? false : true);
}

function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.4);
      }

var icons = {
    assalto: {
        name: 'Assalto',
        icon:'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
    },
    roubo: {
        name: 'Roubo',
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    },
    sequestro: {
        name: 'Sequestro',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    },
    arrombamento: {
        name: 'Arrombamento',
        icon: 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png'
    },
    tiroteio: {
        name: 'Tiroteio',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    },
    homicidio: {
        name: 'Homicídio',
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    },
    trafico: {
        name: 'Tráfico',
        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
    },
    agressao: {
        name: 'Agressão',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    },
    estupro: {
        name: 'Estupro',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    },
    acidente: {
        name: 'Acidente',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
};


//Legenda do Mapa
var legend = document.getElementById('legend');
for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
}


