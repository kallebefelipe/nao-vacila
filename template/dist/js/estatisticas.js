var estatisticasData = new Array();
var anos = new Array();
var quantidadeAnos = new Array();
var tipos = new Array();
var quantidadeTipo = new Array();
var bairros = new Array();
var quantidadeOcorrencias = new Array();

//GET JSON ESTATISTICAS
$.getJSON( "https://webserver-nao-vacila.herokuapp.com/estatisticas/", function( data ) {
    estatisticasData = data;
	estatisticas();
})

function graficos() {
	var chartAno = new CanvasJS.Chart("chartContainerAno",
        {

          title:{
          text: "Ocorrencias - por ano"
          },
           data: [
          {
            type: "line",

            dataPoints: [
            { x: new Date(anos[0], 01, 31), y: quantidadeAnos[0] },
            { x: new Date(anos[1], 01, 31), y: quantidadeAnos[1] },
            { x: new Date(anos[2], 01, 31), y: quantidadeAnos[2] },
            { x: new Date(anos[3], 01, 31), y: quantidadeAnos[3] },
            { x: new Date(anos[6], 01, 31), y: quantidadeAnos[6] },
            { x: new Date(anos[5], 01, 31), y: quantidadeAnos[5] },
            { x: new Date(anos[4], 01, 31), y: quantidadeAnos[4] }
            ]
          }
          ]
        });

        chartAno.render();
	
	var chartTipo = new CanvasJS.Chart("chartContainerTipo",
        {
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
                    {  y: quantidadeTipo[0], indexLabel: tipos[0] },
                    {  y: quantidadeTipo[1], indexLabel: tipos[1] },
                    {  y: quantidadeTipo[2], indexLabel: tipos[2] },
                    {  y: quantidadeTipo[3], indexLabel: tipos[3] },
                    {  y: quantidadeTipo[4], indexLabel: tipos[4] },
                    {  y: quantidadeTipo[5], indexLabel: tipos[5] },
                    {  y: quantidadeTipo[6], indexLabel: tipos[6] },
					{  y: quantidadeTipo[7], indexLabel: tipos[7] },
					{  y: quantidadeTipo[8], indexLabel: tipos[8] }
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
		anos[i] = estatisticasData.distribuicao_ano[i].ano;
		quantidadeAnos[i] = estatisticasData.distribuicao_ano[i].quantidade; 
	}
		
	for(var i = 0; i < estatisticasData.distribuicao_tipo.length; i++){//For para estatística por tipo
		tipos[i] = estatisticasData.distribuicao_tipo[i].tipo;
		quantidadeTipo[i] = estatisticasData.distribuicao_tipo[i].quantidade;
	}
	graficos();
}