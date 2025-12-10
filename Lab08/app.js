// app.js (Código Corregido y Completo para que funcione)

import { supabase } from "./supabaseClient.js";    

// ¡ESTA LÍNEA FALTABA O SE PERDIÓ!
const from = document.getElementById("curso-form"); 

const inputId = document.getElementById("id"); 
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre"); 
const inputCreditos = document.getElementById("creditos");
const btnSave = document.getElementById("btn-save"); 
const btnCancel = document.getElementById("btn-cancel"); 
const statusDiv = document.getElementById("status");
let editando = false;

// =================
// Eventos
// =================
from.addEventListener("submit", async (e) => {
    e.preventDefault();
    const codigo = inputCodigo.value.trim();
    // CORRECCIÓN ADICIONAL: La variable en el objeto debe coincidir con la columna en Supabase ('nombre_Curso')
    const nombreCurso = inputNombre.value.trim(); // Se renombra a nombreCurso para evitar confusión
    const creditos = parseInt(inputCreditos.value.trim());
    if (editando) {}
    else {await crearCurso(codigo, nombreCurso, creditos);}
  });
// ===================================
// CRUD (Create, Read, Update, Delete)
// ====================================
async function cargarCursos() {
    let { data: cursos, error } = await supabase.from("cursos").select("*");
    console.log(cursos);
    if (error) {
        console.error("Error al cargar cursos:", error);
        return;
    }
    let listaCursos = document.getElementById("lista");
    listaCursos.innerHTML = "";
    cursos.forEach((curso) => {
        let li = document.createElement("li");
        li.textContent = `${curso.codigo} - ${curso.nombre_Curso} [${curso.creditos} créditos]`;
        listaCursos.appendChild(li);
    });
}
// Crear Curso
async function crearCurso(codigo, nombreCurso, creditos) {
    // La clave debe ser 'nombre_Curso' para coincidir con la columna de Supabase
    const curso = {codigo: codigo, nombre_Curso: nombreCurso, creditos: creditos}; 
    let {error} = await supabase.from("cursos").insert([curso]);
    if (error) { 
        console.error(error);
        return;
    }
    cargarCursos(); 
}
    cargarCursos();