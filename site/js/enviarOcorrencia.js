//var formData = new Array();

/*function submitForm(){
    var form = document.getElementById('myForm').submit();
    alert(JSON.stringify(form));
    //formData = JSON.stringify($('myForm').serializeArray());
    //alert(document.getElementById('myForm'));
    var ocorrencia = JSON.stringify({
        endereco: endereco,
        descricao: descricao,
        longitude: longitude,
        id_usuario: null,
        hora: hora,
        bairro: null,
        id_tipo: id_tipo,
        latitude: latitude,
        titulo: titulo,
        data: data
    })
    alert(ocorrencia);
    
}*/


/*$('#myForm').on('submit', function(event){

        var obj = $('myForm').serializeJSON();

        $.ajax({
            type: 'POST',
            url: 'https://webserver-nao-vacila.herokuapp.com/ocorrencia/',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType : 'application/json',
            success: function(data) {
                alert(data)
            }
        });

       return false;
   });
   */



var ocorrencia;

$("form").submit(function(event) {
	event.preventDefault();
    var tipoOcorrencia;
    
    if($("#tipo").val() == "Roubo"){
       tipoOcorrencia = 1;
    }
    else if($("#tipo").val() == "Furto"){
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
    else{
       tipoOcorrencia = -1;
    }
    
    ocorrencia = JSON.stringify({
        endereco: $("#endereco").val(),
        descricao: $("#descricao").val(),
        longitude: $("#longitude").val(),
        hora: $("#hora").val(),
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
    
});
