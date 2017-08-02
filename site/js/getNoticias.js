var noticiasData = new Array();

//GET JSON NOTICIAS
$.getJSON( "http://naovacila.azurewebsites.net/api/noticia", function( data ) {
	alert(JSON.stringify(data));
    noticiasData = data;
	noticias();
})

function noticias() {
	for (var i = 0; i < noticiasData.length; i++){
		var titulo = markersData[i].Titulo;
		var subtitulo = markersData[i].Subtitulo;
		var data = markersData[i].Data;
		var hora = markersData[i].Hora;
		var urlNoticia = markersData[i].UrlNoticia;
		var urlImagem = markersData[i].UrlImagem;
		criarNoticias(titulo,subtitulo,data,hora,urlNoticia,urlImagem);
   }
}

function criarNoticias(titulo, subtitulo, data, hora, urlNoticia, urlImagem){
	for(var i = 0; i < noticiasData.length; i++){
		//Criar lista de notícias no html
	}
}