var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/index", {
        templateUrl : "index.html"
    })
    .when("/rota", {
        templateUrl : "rota.html"
    })
    .when("/estatisticas", {
        templateUrl : "estatisticas.html"
    })
    .when("/cadastro", {
        templateUrl : "cadastro.html"
    });
});