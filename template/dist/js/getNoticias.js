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
	//Fazer Cria Img 
	//var img = document.createElement("img");
	//img.attr('src', urlImagem);
	//document.getElementById('noticia').appendChild(img);
	//Cria Titulo
	var h4 = document.createElement("h4");
	var titulo = document.createTextNode(titulo);
	h4.appendChild(titulo);
	document.getElementById('noticia').appendChild(h4);
	//Cria Subtitulo
	var p1 = document.createElement("p");
	var subtitulo = document.createTextNode(subtitulo);
	p1.appendChild(subtitulo);
	document.getElementById('noticia').appendChild(p1);
	//Cria Data
	var p2 = document.createElement("p");
	var data = document.createTextNode(data);
	p2.appendChild(data);
	document.getElementById('noticia').appendChild(p2);
	//Cria Hora
	var p3 = document.createElement("p");
	var hora= document.createTextNode(hora);
	p3.appendChild(hora);
	document.getElementById('noticia').appendChild(p3);
	//Cria Link
	var p4 = document.createElement("a");
	var link= document.createTextNode(urlNoticia);
	p4.appendChild(link);
	document.getElementById('noticia').appendChild(p4);
}