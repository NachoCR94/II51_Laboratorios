import { supabase } from "./supabaseClient.js";

// Referencias a los elementos del HTML
const loginForm = document.getElementById('loginForm');
const msgBox = document.getElementById('welcomeMessage');
const redirectButton = document.getElementById('redirectButton');

// Manejar el evento de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // NOTA: Aquí podrías buscar en Supabase si el usuario existe.
    // Por ahora, como es un portal de acceso simulado, activamos el modal.
    console.log("Intento de login con:", username);
    
    // Mostramos el modal de éxito que tienes en tu HTML
    msgBox.classList.add('visible');
});

// Configurar el botón de continuar del modal
redirectButton.addEventListener('click', () => {
    msgBox.classList.remove('visible');
    
    // Redirigimos a la página de cursos (que es el siguiente paso)
    window.location.href = 'cursos.html';
});