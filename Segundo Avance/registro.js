<script type="module">
    import { supabase } from "./supabaseClient.js";

    const form = document.getElementById('matriculaForm');
    const cursosContainer = document.getElementById('cursos-container');
    const profesorSelect = document.getElementById('profesor');

    // Función inteligente para extraer datos sin importar el nombre exacto de la columna
    const extraerDato = (objeto, posiblesNombres) => {
        const llaveEncontrada = Object.keys(objeto).find(key => 
            posiblesNombres.some(posible => key.toLowerCase() === posible.toLowerCase())
        );
        return llaveEncontrada ? objeto[llaveEncontrada] : null;
    };

    async function cargarProfesores() {
        try {
            const { data, error } = await supabase.from('profesores').select('*');
            if (error) throw error;

            profesorSelect.innerHTML = '<option value="" disabled selected>Seleccione un profesor guía</option>';
            data.forEach(prof => {
                const nombre = extraerDato(prof, ['nombre', 'nombre_profesor', 'profesor']) || "Sin nombre";
                const option = document.createElement('option');
                option.value = nombre;
                option.textContent = nombre;
                profesorSelect.appendChild(option);
            });
        } catch (err) { console.error("Error en profes:", err); }
    }

    async function cargarCursos() {
        try {
            const { data, error } = await supabase.from('cursos').select('*');
            if (error) throw error;

            console.log("Datos crudos detectados:", data); // Esto es para que revises en la consola
            cursosContainer.innerHTML = '';
            
            // Agrupar por cuatrimestre
            const grupos = data.reduce((acc, curso) => {
                const cuatri = extraerDato(curso, ['cuatrimestre', 'periodo', 'nivel']) || "General";
                acc[cuatri] = acc[cuatri] || [];
                acc[cuatri].push(curso);
                return acc;
            }, {});

            for (const cuatrimestre in grupos) {
                // Título del Cuatrimestre
                const header = document.createElement('h3');
                header.className = 'text-xl font-bold text-gray-800 border-b border-gray-200 mt-6 pt-4 mb-3';
                header.textContent = cuatrimestre;
                cursosContainer.appendChild(header);

                grupos[cuatrimestre].forEach(curso => {
                    // Extraer datos con nombres flexibles
                    const n = extraerDato(curso, ['nombre', 'curso', 'asignatura']) || "Curso desconocido";
                    const h = extraerDato(curso, ['horario', 'hora', 'dia']) || "No definido";
                    const p = extraerDato(curso, ['profesor', 'instructor', 'docente']) || "No asignado";

                    const div = document.createElement('div');
                    div.className = 'border border-blue-100 p-4 rounded-lg bg-blue-50/50 mb-3';
                    div.innerHTML = `
                        <p class="text-lg font-semibold text-blue-800">${n}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            <label class="text-sm text-gray-700 select-none flex items-center p-2 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" name="cursosMatriculados" value="${n}" class="mr-2 h-4 w-4 text-blue-600">
                                <span><b>Horario:</b> ${h} | <b>Profesor:</b> ${p}</span>
                            </label>
                        </div>
                    `;
                    cursosContainer.appendChild(div);
                });
            }
        } catch (err) { console.error("Error en cursos:", err); }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const id = document.getElementById('identificacion').value;
        const prof = document.getElementById('profesor').value;
        const seleccionados = Array.from(document.querySelectorAll('input[name="cursosMatriculados"]:checked')).map(cb => cb.value);

        if (seleccionados.length === 0) return alert("Selecciona al menos un curso");

        const { error } = await supabase.from('matriculas').insert([{
            estudiante_nombre: nombre,
            identificacion: id,
            profesor_guia: prof,
            cursos_seleccionados: seleccionados
        }]);

        if (error) {
            alert("Error al guardar: " + error.message);
        } else {
            document.getElementById('modalMessage').innerHTML = `Matrícula exitosa para <b>${nombre}</b>.`;
            document.getElementById('confirmationModal').classList.replace('hidden', 'flex');
            form.reset();
        }
    });

    document.getElementById('closeModal').onclick = () => {
        document.getElementById('confirmationModal').classList.replace('flex', 'hidden');
    };

    document.addEventListener('DOMContentLoaded', () => {
        cargarProfesores();
        cargarCursos();
    });
</script>