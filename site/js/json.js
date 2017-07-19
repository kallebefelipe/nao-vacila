/*$.getJSON('http://cors.io/www.webserver-nao-vacila.herokuapp.com/ocorrencia/',
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
    alert(data.id)

    alert('teste');
});*/

/*$(function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
        alert(status);
      if (status == 200) {
        callback(null, xhr.response);
          alert(xhr.response);
          alert('funcionou');
      } else {
        callback(status)
          alert('nao funcionou');       
      }
    };
    xhr.send();
}('http://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json', 'teste'));*/



/*$.ajax({
        type: 'GET',
        url: "http://www.webserver-nao-vacila.herokuapp.com/ocorrencia/format=json",
        crossDomain: false,
        data: { get_param: 'id' },
        dataType: 'json',
        success: function(data) {
            console.log(data);
        }
    });*/

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

var client = new HttpClient();
client.get('http://webserver-nao-vacila.herokuapp.com/ocorrencia/format=json', function(response){
           alert('teste');
        });
