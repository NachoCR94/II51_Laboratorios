// script.js

$(document).ready(function() {

    // 1. Función de Validar
    $("#validarBtn").click(function() {
        var nombre = $("#nombre").val().trim();
        var apellido = $("#apellido").val().trim();
        var mensajeElement = $("#mensaje");

        if (nombre === "" || apellido === "") {
            mensajeElement.text("Error: Ambos campos son obligatorios.").css("color", "red");
        } else {
            mensajeElement.text("Validación exitosa. Bienvenido/a, " + nombre + " " + apellido + ".").css("color", "green");
        }
    });

    // 2. Agregar Clase
    $("#agregarClase").click(function() {
        $("#bloqueTexto").addClass("clase-dinamica");
    });

    // 3. Quitar Clase
    $("#quitarClase").click(function() {
        $("#bloqueTexto").removeClass("clase-dinamica");
    });

    // 4. Mostrar/Ocultar
    $("#mostrarOcultar").click(function() {
        $("#elementoOculto").slideToggle(); // Animación de jQuery para mostrar/ocultar
        // Cambiar el texto del botón si quieres:
        var currentText = $(this).text();
        $(this).text(currentText === "Mostrar/Ocultar Elemento" ? "Ocultar/Mostrar Elemento" : "Mostrar/Ocultar Elemento");
    });

});
