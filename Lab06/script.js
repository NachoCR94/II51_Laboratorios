// SECCIÓN 3: CANVAS Y JAVASCRIPT

const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// --- 1. Dibujo de Figuras Estáticas ---

function dibujarFigurasEstaticas() {
    // A. Rectángulo (Área de rebote)
    ctx.beginPath();
    ctx.fillStyle = '#3498db'; // Azul
    ctx.fillRect(50, 50, 100, 50); 
    
    // B. Línea Diagonal
    ctx.beginPath();
    ctx.strokeStyle = '#e67e22'; // Naranja
    ctx.lineWidth = 4;
    ctx.moveTo(180, 50);
    ctx.lineTo(350, 150);
    ctx.stroke(); 

    // C. Círculo (Contorno)
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.arc(400, 75, 40, 0, Math.PI * 2); 
    ctx.stroke(); 
}

// --- 2. Animación del Punto que Rebota ---

// Propiedades del punto (bolita verde)
let x = 75; // Posición inicial X
let y = 75; // Posición inicial Y
let radio = 8;
let dx = 3; // Velocidad X
let dy = 3; // Velocidad Y

// Límites del área de rebote (el rectángulo azul)
const areaX = 50;
const areaY = 50;
const areaW = 100;
const areaH = 50;

function dibujarPunto() {
    ctx.beginPath();
    ctx.fillStyle = '#2ecc71'; // Verde
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.fill();
}

function actualizarPosicion() {
    // Mover el punto
    x += dx;
    y += dy;

    // Lógica de rebote: verifica si el punto toca los límites del rectángulo azul
    
    // Rebote horizontal (paredes derecha e izquierda)
    if (x + radio > areaX + areaW || x - radio < areaX) {
        dx = -dx; 
        // Corrección de posición para evitar que se quede pegado al borde
        if (x + radio > areaX + areaW) x = areaX + areaW - radio;
        if (x - radio < areaX) x = areaX + radio;
    }

    // Rebote vertical (paredes superior e inferior)
    if (y + radio > areaY + areaH || y - radio < areaY) {
        dy = -dy; 
        // Corrección de posición
        if (y + radio > areaY + areaH) y = areaY + areaH - radio;
        if (y - radio < areaY) y = areaY + radio;
    }
}

function animar() {
    // 1. Limpiar el área de rebote para borrar el rastro de la bolita
    // Se limpia un poco más allá de los límites para asegurar que se borre el punto
    ctx.clearRect(areaX - radio, areaY - radio, areaW + radio * 2, areaH + radio * 2);
    
    // 2. Redibujar las figuras estáticas (ya que clearRect borró el rectángulo azul)
    dibujarFigurasEstaticas();
    
    // 3. Actualizar la posición de la bolita
    actualizarPosicion();
    
    // 4. Dibujar la bolita
    dibujarPunto();
    
    // Solicitar el siguiente frame para animación suave
    requestAnimationFrame(animar);
}

// Iniciar el dibujo y la animación
dibujarFigurasEstaticas();
requestAnimationFrame(animar);