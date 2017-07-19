/*$.getJSON('http://cors.io/www.webserver-nao-vacila.herokuapp.com/ocorrencia/',
function(err, data) {
  if (err != null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your query count: ' + data.query.count);
  }
    alert(data.myName)

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



$.ajax({
        type: 'GET',
        url: "http://cors.io/webserver-nao-vacila.herokuapp.com/ocorrencia/format=json",
        crossDomain: false,
        data: { get_param: 'id' },
        dataType: 'json',
        success: function(data) {
            console.log(data);
        }
    });
