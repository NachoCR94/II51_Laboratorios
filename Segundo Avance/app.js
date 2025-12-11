import { supabase } from "./supabaseClient.js"; 

// Ejemplo de cómo usar Supabase para cargar datos en tu Segundo Avance:
async function cargarDatosDelSegundoAvance() {
    // Si quisieras cargar los cursos del Lab 08 en tu Segundo Avance:
    let { data: cursos, error } = await supabase.from("cursos").select("*");

    if (error) {
        console.error("Error al cargar datos en Segundo Avance:", error);
        return;
    }
    
    console.log("Datos de Supabase cargados en Segundo Avance:", cursos);
    // Aquí iría la lógica para mostrar o usar esos datos en la interfaz de tu Segundo Avance
}

// Llama a la función al inicio de la aplicación
cargarDatosDelSegundoAvance();