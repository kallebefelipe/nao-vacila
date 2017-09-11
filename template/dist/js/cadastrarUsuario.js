var cadastro;
var tok = '123';
var testando = null;

$("form").submit(function(event) {

    cadastro = JSON.stringify({
        token: tok,
        id_google: testando,
        email: $("#email").val(),
        sexo: $("#sexo").val(),
        nome: $("#nome").val() + $("#snome").val(),
        senha: $("#senha").val(),
        url_foto: testando,
        id_fb: testando,
        cidade: $("#endereco").val(),
        id: localStorage.getItem("id_usuario")
    });

    $.ajax({
        type: "POST",
        url: "https://webserver-nao-vacila.herokuapp.com/usuario/",
        data: cadastro,
        dataType: "json",
        contentType: "application/json"

    });

    return confirm("Usuario cadastrado com sucesso");
});