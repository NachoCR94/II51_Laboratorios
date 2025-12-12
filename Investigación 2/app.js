// ===================================
// 1. CANVAS: Dibujar Círculo Rojo (CORREGIDO)
// ===================================
function draw() {
    const canvas = document.getElementById('canvasArea');
    // Verifica si el canvas es soportado
    if (!canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Iniciar el camino para dibujar
    ctx.beginPath();
    
    // Dibuja el círculo: x=150, y=100, radio=40 (Visible)
    ctx.arc(150, 100, 40, 0, 2 * Math.PI); 
    
    // Rellenar con color rojo
    ctx.fillStyle = '#e74c3c'; 
    ctx.fill();
}

// ===================================
// 2. DRAG AND DROP (COMPLETO)
// ===================================

// Función que permite que un elemento sea soltado sobre el área.
function allowDrop(ev) {
    ev.preventDefault();
    // Opcional: Agregar clase 'over' para feedback visual
    if (ev.target.classList.contains('drop-zone')) {
        ev.target.classList.add('over');
    }
}

// Función que remueve la clase 'over' si el arrastre sale de la zona
document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragleave', (ev) => {
        ev.target.classList.remove('over');
    });
});


// Función que se llama cuando el arrastre comienza (guardar el ID del elemento)
function drag(ev) {
    // Almacenar el ID del elemento arrastrado
    ev.dataTransfer.setData("text", ev.target.id);
}

// Función que se llama cuando se suelta el elemento en la zona de destino.
function drop(ev) {
    ev.preventDefault();
    
    // Remover la clase 'over'
    if (ev.target.classList.contains('drop-zone')) {
        ev.target.classList.remove('over');
    }

    // Obtener el ID del elemento arrastrado
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Mover el elemento arrastrado a la zona de destino
    // El uso de appendChild() asegura que el elemento QUEDE dentro de la Caja 1 o Caja 2.
    ev.target.appendChild(draggedElement); 
    
    // Ajustar el estilo para centrarlo o posicionarlo dentro de la zona de caída:
    draggedElement.style.margin = '0';
    draggedElement.style.position = 'absolute';
    draggedElement.style.top = '50%';
    draggedElement.style.left = '50%';
    draggedElement.style.transform = 'translate(-50%, -50%)';
}

// ===================================
// 3. LECTURA DE ARCHIVOS (Preview)
// ===================================
function previewFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var preview = document.getElementById('preview');

    reader.onloadend = function() {
        preview.src = reader.result;
    }

    if (file) {
        // Leer el archivo como una URL de datos (Data URL)
        reader.readAsDataURL(file);
    } else {
        // Limpiar la previsualización si no hay archivo
        preview.src = "";
    }
}