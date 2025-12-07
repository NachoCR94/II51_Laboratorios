// script.js

// Función para el contador (usando JavaScript nativo)
function modificarContador(valor) {
    var contadorElement = document.getElementById("contador");
    var valorActual = parseInt(contadorElement.textContent);
    
    // Aseguramos que el valor sea un número y actualizamos
    if (!isNaN(valorActual)) {
        contadorElement.textContent = valorActual + valor;
    }
}


$(document).ready(function() {
    // 1. Función de Validar
    $("#validarBtn").click(function() {
        var nombre = $("#nombre").val().trim();
        var apellido = $("#apellido").val().trim();
        var mensajeElement = $("#mensaje");

        if (nombre === "" || apellido === "") {
            // Error en fondo oscuro: color rojo vibrante
            mensajeElement.text("Error: Ambos campos son obligatorios.").css("color", "#dc3545"); 
        } else {
            // Éxito en fondo oscuro: color verde brillante
            mensajeElement.text("Validación exitosa. Bienvenido/a, " + nombre + " " + apellido + ".").css("color", "#28a745"); 
        }
    });

    // 2. Agregar Clase: Aplica la clase .clase-dinamica
    $("#agregarClase").click(function() {
        $("#bloqueTexto").addClass("clase-dinamica");
    });

    // 3. Quitar Clase: Remueve la clase .clase-dinamica
    $("#quitarClase").click(function() {
        $("#bloqueTexto").removeClass("clase-dinamica");
    });

    // 4. Mostrar/Ocultar
    $("#mostrarOcultar").click(function() {
        $("#elementoOculto").slideToggle(); 
        var currentText = $(this).text();
        $(this).text(currentText === "Mostrar/Ocultar Elemento" ? "Ocultar Elemento" : "Mostrar/Ocultar Elemento");
    });

});