import { supabase } from "./supabaseClient.js";

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Capturamos los valores de los inputs de tu HTML
    const userInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    try {
        // Consultamos en Supabase si existe el usuario
        // Nota: En .eq() el primer valor es la columna en Supabase, el segundo es lo que escribió el usuario
        const { data, error } = await supabase
            .from('usuarios') 
            .select('*')
            .eq('email', userInput) // Cámbialo a 'carne' si así se llama tu columna en Supabase
            .eq('password', passwordInput)
            .single();

        if (data) {
    console.log("Ingreso exitoso");
    window.location.href = "estudiantes.html"; 
}
            
            // REDIRECCIÓN DIRECTA A ESTUDIANTES
            window.location.href = "estudiantes.html"; 
        } else {
            alert("⚠️ Credenciales incorrectas. Verifique su usuario y contraseña.");
        }

    } catch (err) {
        console.error("Error de conexión:", err);
        alert("Error al conectar con el servidor.");
    }
});
