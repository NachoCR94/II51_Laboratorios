import { supabase } from "./supabaseClient.js";

const form = document.getElementById('estudiante-form');
const tbody = document.getElementById('estudiantes-body');
const statusMsg = document.getElementById('status');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

// 1. CARGAR DATOS (READ)
async function cargarEstudiantes() {
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Cargando datos...</td></tr>';
    const { data, error } = await supabase.from('estudiantes').select('*').order('nombre', { ascending: true });

    if (error) { 
        if (statusMsg) statusMsg.innerText = "Error: " + error.message; 
        return; 
    }

    tbody.innerHTML = '';
    data.forEach(est => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 border-b";
        tr.innerHTML = `
            <td class="px-6 py-4 text-sm font-medium">${est.carne}</td>
            <td class="px-6 py-4 text-sm">${est.nombre}</td>
            <td class="px-6 py-4 text-sm">${est.carrera}</td>
            <td class="px-6 py-4 text-sm text-right space-x-2">
                <button onclick="prepararEdicion('${est.id}', '${est.carne}', '${est.nombre}', '${est.carrera}')" class="text-blue-600 hover:underline">Editar</button>
                <button onclick="eliminarEstudiante('${est.id}')" class="text-red-600 hover:underline">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 2.  GUARDAR / ACTUALIZAR (CREATE & UPDATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Capturamos el ID del campo oculto para saber si es edición
    const id = document.getElementById('idEstudiante').value;
    const carne = document.getElementById('carne').value;
    const nombre = document.getElementById('nombre').value;
    const carrera = document.getElementById('carrera').value;

    const datosEstudiante = { carne, nombre, carrera };

    try {
        if (id) {
            // --- OPERACIÓN: ACTUALIZAR (UPDATE) ---
            const { error } = await supabase.from('estudiantes').update(datosEstudiante).eq('id', id);
            if (error) throw error;
            alert("Estudiante actualizado correctamente");
        } else {
            // --- OPERACIÓN: INSERTAR (CREATE) ---
            const { error } = await supabase.from('estudiantes').insert([datosEstudiante]);
            if (error) throw error;
            alert("Estudiante registrado correctamente");
        }
        
        resetForm();
        cargarEstudiantes();
    } catch (err) {
        alert("Error al procesar la solicitud: " + err.message);
    }
});

// 3. PREPARAR FORMULARIO PARA EDITAR
window.prepararEdicion = (id, carne, nombre, carrera) => {
    // Llenamos el formulario con los datos existentes
    document.getElementById('idEstudiante').value = id;
    document.getElementById('carne').value = carne;
    document.getElementById('nombre').value = nombre;
    document.getElementById('carrera').value = carrera;
    
    // Cambiamos el título y mostramos botón cancelar
    if (formTitle) formTitle.innerText = "Editar Estudiante";
    if (btnCancel) btnCancel.style.display = "inline-block";
    
    // Cambiamos el texto del botón principal
    const btnSubmit = form.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.textContent = "Actualizar Cambios";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 4. ELIMINAR (DELETE)
window.eliminarEstudiante = async (id) => {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
        const { error } = await supabase.from('estudiantes').delete().eq('id', id);
        if (error) alert("Error al eliminar: " + error.message);
        cargarEstudiantes();
    }
};

// 5. RESETEAR FORMULARIO
function resetForm() {
    form.reset();
    document.getElementById('idEstudiante').value = ''; // Limpiamos el ID oculto
    if (formTitle) formTitle.innerText = "Registrar Estudiante";
    if (btnCancel) btnCancel.style.display = "none";
    const btnSubmit = form.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.textContent = "Guardar";
}

// 6. LOGOUT Y CIERRE
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            window.location.href = 'index.html';
        }
    });
}

// --- PEGAR AQUÍ: LÓGICA DE BÚSQUEDA POR BOTÓN ---
const btnBuscar = document.getElementById('btn-buscar');
const inputBusqueda = document.getElementById('inputBusqueda');

function ejecutarBusqueda() {
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
    const filas = document.querySelectorAll('#estudiantes-body tr');

    filas.forEach(fila => {
        const contenidoFila = fila.textContent.toLowerCase();
        if (textoBusqueda === "" || contenidoFila.includes(textoBusqueda)) {
            fila.style.display = ""; 
        } else {
            fila.style.display = "none"; 
        }
    });
}

if (btnBuscar) {
    btnBuscar.addEventListener('click', ejecutarBusqueda);
}

if (inputBusqueda) {
    inputBusqueda.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
}
// -----------------------------------------------

btnCancel.onclick = resetForm;
document.addEventListener('DOMContentLoaded', cargarEstudiantes);