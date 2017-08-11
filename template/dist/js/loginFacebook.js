// Login com Facebook
$(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.9&appId=198811240646933";
          fjs.parentNode.insertBefore(js, fjs);
	
		window.fbAsyncInit = function() {
			  FB.init({
				appId : '{198811240646933}',
				status: true, 
				cookie : true,  // enable cookies to allow the server to access 
									// the session
				xfbml : true,  // parse social plugins on this page
				version : 'v2.8' // use graph api version 2.8
			  });
			}
		//verificaCadastro();
        }(document, 'script', 'facebook-jssdk'));

/*function verificaCadastro(){
	$.getJSON( "https://webserver-nao-vacila.herokuapp.com/usuario", function( data ) {//PUT?
		//VERIFICA SE USUÁRIO ESTA CADASTRADO
		if(){
		   //Se Sim pega id
		} else{
		   //Se não cadastra
		   var usuario = JSON.stringify({
		   		url_foto: null,
				id_fb: null,
				email: null,
				sexo: null,
				token: null,
				cidade: null,
				nome: null
			});

			$.ajax({
				type: "POST",
				url: "https://webserver-nao-vacila.herokuapp.com/usuario",
				data: usuario,
				dataType: "json",
				contentType : "application/json"
			});
		}
	})
}*/