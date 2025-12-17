import { supabase } from "./supabaseClient.js";

const form = document.getElementById('estudiante-form');
const tbody = document.getElementById('estudiantes-body');
const statusMsg = document.getElementById('status');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

async function cargarEstudiantes() {
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center">Cargando datos...</td></tr>';
    const { data, error } = await supabase.from('estudiantes').select('*').order('nombre', { ascending: true });

    if (error) { statusMsg.innerText = "Error: " + error.message; return; }

    tbody.innerHTML = '';
    data.forEach(est => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-50";
        tr.innerHTML = `
            <td class="table-cell-custom font-medium">${est.carne}</td>
            <td class="table-cell-custom">${est.nombre}</td>
            <td class="table-cell-custom">${est.carrera}</td>
            <td class="table-cell-custom text-right space-x-2">
                <button onclick="prepararEdicion('${est.id}', '${est.carne}', '${est.nombre}', '${est.carrera}')" class="text-blue-600 hover:underline">Editar</button>
                <button onclick="eliminarEstudiante('${est.id}')" class="text-red-600 hover:underline">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idEstudiante').value;
    const carne = document.getElementById('carne').value;
    const nombre = document.getElementById('nombre').value;
    const carrera = document.getElementById('carrera').value;

    if (id) {
        await supabase.from('estudiantes').update({ carne, nombre, carrera }).eq('id', id);
    } else {
        await supabase.from('estudiantes').insert([{ carne, nombre, carrera }]);
    }
    
    resetForm();
    cargarEstudiantes();
});

window.eliminarEstudiante = async (id) => {
    if (confirm('¿Eliminar estudiante?')) {
        await supabase.from('estudiantes').delete().eq('id', id);
        cargarEstudiantes();
    }
};

window.prepararEdicion = (id, carne, nombre, carrera) => {
    document.getElementById('idEstudiante').value = id;
    document.getElementById('carne').value = carne;
    document.getElementById('nombre').value = nombre;
    document.getElementById('carrera').value = carrera;
    formTitle.innerText = "Editar Estudiante";
    btnCancel.style.display = "inline-block";
};

function resetForm() {
    form.reset();
    document.getElementById('idEstudiante').value = '';
    formTitle.innerText = "Registrar Estudiante";
    btnCancel.style.display = "none";
}

btnCancel.onclick = resetForm;
document.addEventListener('DOMContentLoaded', cargarEstudiantes);

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