import { supabase } from "./supabaseClient.js";    

const from = document.getElementById("curso-form");
const inputId = document.getElementById("idCurso");
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre_Curso");
const inputCreditos = document.getElementById("creditos");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");
const statusDiv = document.getElementById("status");
let editando = false;
// =================
// Eventos
// =================
from.addEventListener("submit", async (e) => {
    e.preventDefault();
    const codigo = inputCodigo.value.trim();
    const nombre_Curso = inputNombre.value.trim();
    const creditos = parseInt(inputCreditos.value.trim());
    if (editando) {}
    else {await crearCurso(codigo, nombre_Curso, creditos);}
  });
// ===================================
// CRUD (Create, Read, Update, Delete)
// ====================================
async function cargarCursos() {     
    let { data: cursos, error } = await supabase.from("Cursos").select("*");
    console.log(cursos);
    if (error) {
        console.error("Error al cargar cursos:", error);
        return;
    }
    let listaCursos = document.getElementById("lista");
    listaCursos.innerHTML = "";
    cursos.forEach((curso) => {
        let li = document.createElement("li");
        // li.textContent = `${curso.codigo} - ${curso.nombreCurso}`;
        li.textContent = `${curso.codigo} - ${curso.nombre_Curso} [${curso.creditos} créditos]`;
        listaCursos.appendChild(li);
    });
}
// Crear Curso
async function crearCurso(codigo, nombre_Curso, creditos) {
    const curso = {codigo, nombre_Curso, creditos };
    let { error } = await supabase.from("Cursos").insert([curso]);
    if (error) { 
        console.error(error);
        return
    }
    cargarCursos();
}
    cargarCursos();