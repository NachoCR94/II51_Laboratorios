import { supabase } from "./supabaseClient.js";

const profesorForm = document.getElementById('profesor-form');
const grid = document.getElementById('professor-grid');
const statusMsg = document.getElementById('status');
const totalLabel = document.getElementById('total-profesores');

async function cargarProfesores() {
    const { data: profesores, error } = await supabase
        .from('profesores') // Asegúrate que tu tabla se llame 'profesores'
        .select('*')
        .order('nombre', { ascending: true });

    if (error) {
        statusMsg.innerHTML = `<span style="color:red">Error: ${error.message}</span>`;
        return;
    }

    grid.innerHTML = '';
    profesores.forEach(prof => {
        // Generar iniciales para el placeholder de imagen
        const iniciales = prof.nombre.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        
        const card = document.createElement('div');
        card.className = 'professor-card';
        card.innerHTML = `
            <img src="https://placehold.co/96x96/005DA4/E0F7FF?text=${iniciales}" class="profile-img">
            <div class="name">${prof.nombre}</div>
            <div class="department">${prof.departamento}</div>
            <div class="contact-info">
                <a href="mailto:${prof.correo}">${prof.correo}</a>
            </div>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
                <button onclick="eliminarProfesor('${prof.id}')" style="color: #ef4444; background: none; border: 1px solid #ef4444; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 0.7rem;">Eliminar</button>
            </div>
        `;
        grid.appendChild(card);
    });

    totalLabel.innerText = `Total de Profesores en la lista: ${profesores.length}`;
}

profesorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const departamento = document.getElementById('departamento').value;
    const correo = document.getElementById('correo').value;

    statusMsg.innerText = "Guardando...";

    const { error } = await supabase
        .from('profesores')
        .insert([{ nombre, departamento, correo }]);

    if (error) {
        statusMsg.innerHTML = `<span style="color:red">Error: ${error.message}</span>`;
    } else {
        profesorForm.reset();
        statusMsg.innerHTML = `<span style="color:green">¡Profesor registrado!</span>`;
        cargarProfesores();
    }
});

window.eliminarProfesor = async (id) => {
    if (confirm('¿Eliminar a este profesor?')) {
        await supabase.from('profesores').delete().eq('id', id);
        cargarProfesores();
    }
};

document.addEventListener('DOMContentLoaded', cargarProfesores);