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
        }(document, 'script', 'facebook-jssdk'));
	
