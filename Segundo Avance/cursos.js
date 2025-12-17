import { supabase } from "./supabaseClient.js";

const cursoForm = document.getElementById('curso-form');
const tbody = document.getElementById('cursos-body');
const statusMsg = document.getElementById('status');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

// Función para cargar los cursos desde Supabase
async function cargarCursos() {
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Cargando cursos...</td></tr>';
    
    const { data: cursos, error } = await supabase
        .from('cursos')
        .select('*')
        .order('nombre_Curso', { ascending: true });

    if (error) {
        statusMsg.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
        return;
    }

    tbody.innerHTML = '';
    cursos.forEach(curso => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50 transition";
        tr.innerHTML = `
            <td class="table-cell-custom font-semibold text-gray-900">${curso.codigo}</td>
            <td class="table-cell-custom text-gray-700">${curso.nombre_Curso}</td>
            <td class="table-cell-custom text-center text-gray-600">${curso.creditos}</td>
            <td class="table-cell-custom text-right space-x-2">
                <button onclick="prepararEdicion('${curso.idCurso}', '${curso.codigo}', '${curso.nombre_Curso}', ${curso.creditos})" class="text-blue-600 hover:text-blue-800 font-medium">Editar</button>
                <button onclick="eliminarCurso('${curso.idCurso}')" class="text-red-600 hover:text-red-800 font-medium">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Manejar el envío del formulario (Guardar o Actualizar)
cursoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('id').value;
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const creditos = document.getElementById('creditos').value;

    statusMsg.innerText = "Procesando...";

    if (id) {
        // ACTUALIZAR
        const { error } = await supabase
            .from('cursos')
            .update({ codigo, nombre_Curso: nombre, creditos })
            .eq('idCurso', id);
        
        if (error) statusMsg.innerHTML = `<span class="text-red-500">${error.message}</span>`;
        else resetForm();
    } else {
        // INSERTAR NUEVO
        const { error } = await supabase
            .from('cursos')
            .insert([{ codigo, nombre_Curso: nombre, creditos }]);
        
        if (error) statusMsg.innerHTML = `<span class="text-red-500">${error.message}</span>`;
        else resetForm();
    }
    
    cargarCursos();
});

// Funciones globales para botones de la tabla
window.eliminarCurso = async (id) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
        const { error } = await supabase.from('cursos').delete().eq('idCurso', id);
        if (error) alert("Error al eliminar");
        cargarCursos();
    }
};

window.prepararEdicion = (id, codigo, nombre, creditos) => {
    document.getElementById('id').value = id;
    document.getElementById('codigo').value = codigo;
    document.getElementById('nombre').value = nombre;
    document.getElementById('creditos').value = creditos;
    
    formTitle.innerText = "Editar curso";
    btnCancel.style.display = "inline-block";
};

window.resetForm = () => {
    cursoForm.reset();
    document.getElementById('id').value = '';
    formTitle.innerText = "Registrar curso";
    btnCancel.style.display = "none";
    statusMsg.innerText = "";
};

btnCancel.onclick = resetForm;

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', cargarCursos);

// Lógica para cerrar sesión
const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
        if (confirmar) {
            // Si usas Supabase Auth en el futuro, aquí iría: await supabase.auth.signOut();
            window.location.href = 'index.html';
        }
    });
}