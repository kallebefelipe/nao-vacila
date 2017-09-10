var cadastro;

$("form").submit(function(event) {

    cadastro = JSON.stringify({
        nome: $("#nome").val() + $("#snome").val(),
        cidade: $("#endereco").val(),
        sexo: $("#sexo").val(),
        email: $("#email").val(),
        senha: $("#senha").val(),
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

