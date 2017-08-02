var estatisticasBairroData = new Array();
var estatisticasTipoData = new Array();
var estatisticasAnoData = new Array();

var anos = new Array();
var tipos = new Array();
var bairros = new Array();
var quantidadeOcorrencias = new Array();//talvez nao use

//GET JSON ESTATISTICAS BAIRRO
/*$.getJSON( "https://webserver-nao-vacila.herokuapp.com/estatisticas/", function( data ) {
    estatisticasBairroData = data;
	bairrosOcorrencias();
})

//GET JSON ESTATISTICAS TIPO
$.getJSON( "site", function( data ) {
    estatisticasTipoData = data;
	tipoOcorrencias();
})

//GET JSON ESTATISTICAS ANO
$.getJSON( "site", function( data ) {
    estatisticasAnoData = data;
	anoOcorrencias();
})*/

window.onload = function () {
	var chartMes = new CanvasJS.Chart("chartContainerMes",
        {

          title:{
          text: "Ocorrencias - por ano"
          },
           data: [
          {
            type: "line",

            dataPoints: [
            { x: new Date(2011, 11, 31), y: 450 },//tipos[0]
            { x: new Date(2012, 11, 31), y: 414 },
            { x: new Date(2013, 11, 31), y: 520 },
            { x: new Date(2014, 11, 31), y: 460 },
            { x: new Date(2015, 11, 31), y: 450 },
            { x: new Date(2016, 11, 31), y: 500 },
            { x: new Date(2017, 11, 31), y: 480 }
            ]
          }
          ]
        });

        chartMes.render();
	
	var chartTipo = new CanvasJS.Chart("chartContainerTipo",
        {
            theme: "theme2",
            title:{
                text: "Tipos de ocorrências"
            },
            data: [
            {
                type: "pie",
                showInLegend: true,
                toolTipContent: "{y} - #percent %",
                legendText: "{indexLabel}",
                dataPoints: [
                    {  y: 4181563, indexLabel: "Roubo" },//anos[0]
                    {  y: 2175498, indexLabel: "Furto" },
                    {  y: 3125844, indexLabel: "Sequestro" },
                    {  y: 1176121, indexLabel: "Arrombamento"},
                    {  y: 1727161, indexLabel: "Tiroteio" },
                    {  y: 4303364, indexLabel: "Homicídios"},
                    {  y: 1717786, indexLabel: "Tráfico"}
                ]
            }
            ]
        });
        chartTipo.render();
}

function bairrosOcorrencias() {//FALTA TESTAR
	var maior = 0;
	var posicaoBairro;
	for(var x = 0; x < 5; x++){//Pega os 5 bairros com mais ocorrências
		for (var i = 0; i < estatisticasBairroData.length; i++){
			var numeroOcorrencias = estatisticasBairroData[i].quantidade;
			if(numeroOcorrencias >= maior){
				posicaoBairro = i;
				maior = numeroOcorrencias;
			}
		}
		bairros[x] = estatisticasBairroData[posicaoBairro].bairro;
		quantidadeOcorrencias[x] = estatisticasBairroData[posicaoBairro].quantidade;
	}
	for(var i = 0; i < bairros.length; i++){//Coloca os 5 bairros com mais ocorrências numa tabela
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var bairro = document.createTextNode(bairros[i]);
		tr.appendChild(td).appendChild(bairro);
		document.getElementById('bairros').appendChild(tr);
	}
}

function anoOcorrencias(){
	for(var i = 0; i < estatisticasAnoData.length; i++){
		anos[i] = estatisticasAnoData[i].quantidade;
	}
}

function tipoOcorrencias(){
	for(var i = 0; i < estatisticasTipoData.length; i++){
		tipos[i] = estatisticasTipoData[i].quantidade;
	}
}