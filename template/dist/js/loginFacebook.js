// Login com Facebook
var usuario;
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
		
        }(document, 'script', 'facebook-jssdk'));

function checkLoginState(){
	FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
				  FB.api('/me?fields=name,gender,email', function(response) {
					  usuario = JSON.stringify({
						id_fb: response.id,
						email: response.email,
						sexo: response.gender,
						nome: response.name
					});
					 cadastraUsuario();
				 });	  
			  }
			 });
}

function cadastraUsuario(){
	$.ajax({
				type: "POST",
				url: "https://webserver-nao-vacila.herokuapp.com/usuario/",
				data: usuario,
				dataType: "json",
				contentType : "application/json",
				  success: function (msg) {
					document.getElementById('id_usuario').value = msg.nao_vacila_id;
				  }
			});
}