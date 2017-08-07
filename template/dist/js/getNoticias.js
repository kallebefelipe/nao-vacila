var noticiasData = new Array();

//GET JSON NOTICIAS
$.getJSON( "http://naovacila.azurewebsites.net/api/noticia", function( data ) {
    noticiasData = data;
	noticias();
})

function noticias() {
	for (var i = 0; i < noticiasData.length; i++){
		var titulo = noticiasData[i].Titulo;
		var subtitulo = noticiasData[i].Subtitulo;
		var data = noticiasData[i].Data;
		var hora = noticiasData[i].Hora;
		var urlNoticia = noticiasData[i].UrlNoticia;
		var urlImagem = noticiasData[i].UrlImagem;
		criarNoticia(titulo,subtitulo,data,hora,urlNoticia,urlImagem);
   }
}

function criarNoticia(titulo, subtitulo, data, hora, urlNoticia, urlImagem){
	//Criar lista de notícias no html
	
	var p = document.createElement("p");
	var titulo = document.createTextNode(titulo);
	p.appendChild(titulo);
	document.getElementById('noticia').appendChild(p);
}