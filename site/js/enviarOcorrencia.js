function submitform(){
    var formData = JSON.stringify($("#myForm").serializeArray());
    alert($("#myForm").serializeArray());
    /*$.ajax({
      type: "POST",
      url: "https://webserver-nao-vacila.herokuapp.com/ocorrencia/?format=json",
      data: formData,
      success: function(){},
      dataType: "json",
      contentType : "application/json"
    });*/
}
