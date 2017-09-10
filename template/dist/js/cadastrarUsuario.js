var cadastro;

$("form").submit(function(event) {

    cadastro = JSON.stringify({
        token: null,
        id_google: null
        email: $("#email").val(),
        sexo: $("#sexo").val(),
        nome: $("#nome").val() + $("#snome").val(),
        senha: $("#senha").val(),
        url_foto: null
        id_fb: null
        cidade: $("#endereco").val(),
        id: localStorage.getItem("id")

        $.ajax({
        type: "POST",
        url: "https://webserver-nao-vacila.herokuapp.com/usuario/",
        data: cadastro,
        dataType: "json",
        contentType: "application/json"
        });
    });
});

