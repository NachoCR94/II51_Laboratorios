// SECCIÓN 3: CANVAS Y JAVASCRIPT

const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// --- 1. Dibujo de Figuras Estáticas ---
// Se mantiene la función de dibujo original
function dibujarFigurasEstaticas() {
    // A. Rectángulo (Área de rebote original, ahora solo es una figura)
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
let x = 75; // Posición inicial X (dentro del canvas)
let y = 75; // Posición inicial Y (dentro del canvas)
let radio = 8;
let dx = 3; // Velocidad X
let dy = 3; // Velocidad Y

// NUEVOS LÍMITES: Usamos el tamaño completo del canvas
const canvasW = canvas.width;  // 500
const canvasH = canvas.height; // 300

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

    // Lógica de rebote contra los bordes del CANVAS completo
    
    // Rebote horizontal (paredes derecha e izquierda del canvas)
    if (x + radio > canvasW || x - radio < 0) {
        dx = -dx; 
    }

    // Rebote vertical (paredes superior e inferior del canvas)
    if (y + radio > canvasH || y - radio < 0) {
        dy = -dy; 
    }
}

function animar() {
    // 1. Limpiar TODO el lienzo para borrar todos los rastros
    ctx.clearRect(0, 0, canvasW, canvasH);
    
    // 2. Redibujar las figuras estáticas
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