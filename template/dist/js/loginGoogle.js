// Login com Google
$(function onSignIn(googleUser) {
  	var profile = googleUser.getBasicProfile();
	var id_token = googleUser.getAuthResponse().id_token;
  	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  	console.log('Name: ' + profile.getName());
  	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	/*Enviar para servidor o id
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://webserver-nao-vacila.herokuapp.com/usuario');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	  console.log('Signed in as: ' + xhr.responseText);
	};
	xhr.send('idtoken=' + id_token);*/
});

/*Deslogar
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}*/