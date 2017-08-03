var estatisticasData = new Array();
var anos = new Array();
var tipos = new Array();
var bairros = new Array();
var quantidadeOcorrencias = new Array();

//GET JSON ESTATISTICAS
$.getJSON( "https://webserver-nao-vacila.herokuapp.com/estatisticas/", function( data ) {
    estatisticasData = data;
	estatisticas();
})

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

function estatisticas() {
	var posicaoBairro;
	for(var x = 0; x < 5; x++){//Pega os 5 bairros com mais ocorrências
		var maior = 0;
		for (var i = 0; i < estatisticasData.distribuicao_bairro.length; i++){
			var numeroOcorrencias = estatisticasData.distribuicao_bairro[i].quantidade;
			if(numeroOcorrencias >= maior){
				posicaoBairro = i;
				maior = numeroOcorrencias;
			}
		}
		bairros[x] = estatisticasData.distribuicao_bairro[posicaoBairro].bairro;
		estatisticasData.distribuicao_bairro[posicaoBairro].bairro = null;
		quantidadeOcorrencias[x] = estatisticasData.distribuicao_bairro[posicaoBairro].quantidade;
		estatisticasData.distribuicao_bairro[posicaoBairro].quantidade = 0;
	}
	
	for(var i = 0; i < bairros.length; i++){//Coloca os 5 bairros com mais ocorrências numa tabela
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var bairro = document.createTextNode(bairros[i]);
		var quantidade = document.createTextNode(quantidadeOcorrencias[i]);
		tr.appendChild(td1).appendChild(bairro);
		tr.appendChild(td2).appendChild(quantidade);
		document.getElementById('bairros').appendChild(tr);
	}
	
	for(var i = 0; i < estatisticasData.distribuicao_ano.length; i++){//For para estatística por ano
		//anos[i] = 
	}
		
	for(var i = 0; i < estatisticasData.distribuicao_tipo.length; i++){//For para estatística por tipo
		//tipos[i] =
	}
}