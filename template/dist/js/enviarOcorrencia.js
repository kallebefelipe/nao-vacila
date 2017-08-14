var ocorrencia;
var uid;

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
			var tipoOcorrencia;

			if($("#tipo").val() == "Assalto"){
			   tipoOcorrencia = 1;
			}
			else if($("#tipo").val() == "Roubo"){
			   tipoOcorrencia = 2;
			}
			else if($("#tipo").val() == "Sequestro"){
			   tipoOcorrencia = 3;
			}
			else if($("#tipo").val() == "Arrombamento"){
			   tipoOcorrencia = 4;
			}
			else if($("#tipo").val() == "Tiroteio"){
			   tipoOcorrencia = 5;
			}
			else if($("#tipo").val() == "Homicídio"){
			   tipoOcorrencia = 6;
			}
			else if($("#tipo").val() == "Tráfico"){
			   tipoOcorrencia = 7;
			}
			else if($("#tipo").val() == "Agressão"){
			   tipoOcorrencia = 8;
			
			}else if($("#tipo").val() == "Estupro"){
			   tipoOcorrencia = 9;
			}
			else if($("#tipo").val() == "Acidente"){
			   tipoOcorrencia = 10;
			}
			else{
			   tipoOcorrencia = -1;
			}

			ocorrencia = JSON.stringify({
				endereco: $("#endereco").val(),
				descricao: $("#descricao").val(),
				longitude: $("#longitude").val(),
				hora: $("#hora").val(),
				id_usuario: localStorage.getItem("id_usuario"),
				id_tipo: tipoOcorrencia,
				latitude: $("#latitude").val(),
				titulo: $("#titulo").val(),
				data: $("#data").val()
			});

			$.ajax({
				type: "POST",
				url: "https://webserver-nao-vacila.herokuapp.com/ocorrencia/",
				data: ocorrencia,
				dataType: "json",
				contentType : "application/json"
			});

			return confirm("Ocorrência cadastrada com sucesso");		  
		  
	  } else if (response.status === 'not_authorized') {
		// the user is logged in to Facebook, 
		// but has not authenticated your app
		  alert('Você precisa se autenticar');
	  } else {
		// the user isn't logged in to Facebook.
		  alert('Você precisa estar logado para cadastrar ocorrência');
	  }
	 });
	
    
});