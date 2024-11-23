const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables del juego
let score = 0;
let enemies = [];
let gameOver = false;

// Cargar imágenes
const dienteImg = new Image();
dienteImg.src = '/static/img/diente.png';

const cariesImg = new Image();
cariesImg.src = '/static/img/caries.png';

// Posición inicial del diente (centro de la pantalla)
let diente = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
};

// Evento para mover el diente con el cursor
canvas.addEventListener('mousemove', (e) => {
    diente.x = e.clientX - diente.width / 2;
    diente.y = e.clientY - diente.height / 2;
});

// Función para generar enemigos (caries)
function generateEnemy() {
    const size = Math.random() * 30 + 20; // Tamaño aleatorio entre 20 y 50 px
    const speed = Math.random() * 2 + 1; // Velocidad aleatoria entre 1 y 3
    const spawnEdge = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda

    let x, y;
    if (spawnEdge === 0) {
        x = Math.random() * canvas.width;
        y = -size;
    } else if (spawnEdge === 1) {
        x = canvas.width + size;
        y = Math.random() * canvas.height;
    } else if (spawnEdge === 2) {
        x = Math.random() * canvas.width;
        y = canvas.height + size;
    } else {
        x = -size;
        y = Math.random() * canvas.height;
    }

    enemies.push({
        x: x,
        y: y,
        width: size,
        height: size,
        speed: speed,
        angle: Math.atan2(diente.y - y, diente.x - x), // Direccion hacia el diente
    });
}

// Función para detectar colisiones
function detectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Función para actualizar el estado del juego
function updateGame() {
    // Mover enemigos hacia el diente
    enemies.forEach((enemy, index) => {
        enemy.x += Math.cos(enemy.angle) * enemy.speed;
        enemy.y += Math.sin(enemy.angle) * enemy.speed;

        // Detectar colisión con el diente
        if (detectCollision(diente, enemy)) {
            gameOver = true;
        }

        // Eliminar enemigos fuera de la pantalla
        if (
            enemy.x < -enemy.width ||
            enemy.x > canvas.width + enemy.width ||
            enemy.y < -enemy.height ||
            enemy.y > canvas.height + enemy.height
        ) {
            enemies.splice(index, 1);
        }
    });

    // Generar nuevos enemigos periódicamente
    if (Math.random() < 0.02) {
        generateEnemy();
    }

    // Aumentar la dificultad con el tiempo
    if (score % 100 === 0 && score > 0) {
        enemies.forEach((enemy) => (enemy.speed += 0.1));
    }
}

// Función para dibujar el juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el diente
    ctx.drawImage(dienteImg, diente.x, diente.y, diente.width, diente.height);

    // Dibujar los enemigos
    enemies.forEach((enemy) => {
        ctx.drawImage(cariesImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Dibujar el puntaje
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Puntaje: ${score}`, 20, 40);
}

// Función principal del juego
function gameLoop() {
    if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.fillText('¡Juego terminado!', canvas.width / 2 - 150, canvas.height / 2);
        ctx.fillText(`Puntaje final: ${score}`, canvas.width / 2 - 150, canvas.height / 2 + 50);
        return;
    }

    updateGame();
    drawGame();
    score++; // Aumentar el puntaje con cada frame
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();