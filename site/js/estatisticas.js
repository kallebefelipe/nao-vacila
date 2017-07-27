var estatisticasData = new Array();

//GET JSON ESTATISTICAS
/*$.getJSON( "site", function( data ) {
    estatisticasData = data;
})*/

window.onload = function () {
	var chartMes = new CanvasJS.Chart("chartContainerMes",
        {

          title:{
          text: "Ocorrencias - por mês"
          },
           data: [
          {
            type: "line",

            dataPoints: [
            { x: new Date(2016, 08, 1), y: 450 },
            { x: new Date(2016, 09, 1), y: 414 },
            { x: new Date(2016, 10, 1), y: 520 },
            { x: new Date(2017, 00, 1), y: 460 },
            { x: new Date(2017, 01, 1), y: 450 },
            { x: new Date(2017, 02, 1), y: 500 },
            { x: new Date(2017, 03, 1), y: 480 },
            { x: new Date(2017, 04, 1), y: 480 },
            { x: new Date(2017, 05, 1), y: 410 },
            { x: new Date(2017, 06, 1), y: 500 },
            { x: new Date(2017, 07, 1), y: 480 },
            { x: new Date(2017, 08, 1), y: 510 }
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
                yValueFormatString: "#0.#,,. Million",
                legendText: "{indexLabel}",
                dataPoints: [
                    {  y: 4181563, indexLabel: "Roubo" },
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