// Estado de Taco
let taco = {
    hambre: 50,
    energia: 50,
    felicidad: 50
};

// Elementos del DOM
const tacoAvatar = document.getElementById('tacoAvatar');
const tacoThought = document.getElementById('tacoThought');
const hungerValue = document.getElementById('hungerValue');
const hungerBar = document.getElementById('hungerBar');
const energyValue = document.getElementById('energyValue');
const energyBar = document.getElementById('energyBar');
const happinessValue = document.getElementById('happinessValue');
const happinessBar = document.getElementById('happinessBar');
const feedBtn = document.getElementById('feedBtn');
const playBtn = document.getElementById('playBtn');
const sleepBtn = document.getElementById('sleepBtn');

// === IA BÁSICA DE TACO ===
function tacoThinks() {
    // Taco piensa según su estado
    if (taco.hambre > 70) {
        return "Dame comida YA! 🐱";
    } else if (taco.hambre < 20) {
        return "Estoy lleno, no tengo hambre 😸";
    }

    if (taco.energia < 30) {
        return "Estoy cansado 💤";
    } else if (taco.energia > 90) {
        return "¡Tengo mucha energía! ⚡";
    }

    if (taco.felicidad > 80) {
        return "¡Estoy feliz! 🐈";
    } else if (taco.felicidad < 30) {
        return "Me siento triste... 😿";
    }

    // Estados críticos
    if (taco.hambre > 90) {
        return "¡ME MUERO DE HAMBRE! 😾";
    }
    if (taco.energia < 20) {
        return "Zzz... casi no puedo abrir los ojos 😴";
    }
    if (taco.felicidad < 20) {
        return "Estoy muy triste... nadie me quiere 💔";
    }

    // Estados ideales
    if (taco.hambre < 40 && taco.energia > 60 && taco.felicidad > 60) {
        return "¡Me siento genial! Eres el mejor 😻";
    }

    // Estado normal
    return "Miau miau~ 😺";
}

// Actualizar el pensamiento de Taco
function updateThought() {
    const thought = tacoThinks();
    tacoThought.textContent = thought;

    // Cambiar avatar según el estado
    updateAvatar();
}

// Actualizar el avatar según el estado
function updateAvatar() {
    tacoAvatar.className = 'taco-avatar';

    if (taco.energia < 30) {
        tacoAvatar.textContent = '😴';
        tacoAvatar.classList.add('sleeping');
    } else if (taco.felicidad > 80) {
        tacoAvatar.textContent = '😻';
        tacoAvatar.classList.add('happy');
    } else if (taco.hambre > 70) {
        tacoAvatar.textContent = '😾';
    } else if (taco.felicidad < 30) {
        tacoAvatar.textContent = '😿';
    } else {
        tacoAvatar.textContent = '🐱';
    }
}

// Actualizar la interfaz
function updateUI() {
    // Limitar valores entre 0 y 100
    taco.hambre = Math.max(0, Math.min(100, taco.hambre));
    taco.energia = Math.max(0, Math.min(100, taco.energia));
    taco.felicidad = Math.max(0, Math.min(100, taco.felicidad));

    // Actualizar valores numéricos
    hungerValue.textContent = Math.round(taco.hambre);
    energyValue.textContent = Math.round(taco.energia);
    happinessValue.textContent = Math.round(taco.felicidad);

    // Actualizar barras
    hungerBar.style.width = taco.hambre + '%';
    energyBar.style.width = taco.energia + '%';
    happinessBar.style.width = taco.felicidad + '%';

    // Actualizar pensamiento
    updateThought();
}

// === ACCIONES DEL JUGADOR ===

// Alimentar a Taco
function feedTaco() {
    taco.hambre = Math.max(0, taco.hambre - 30);
    taco.felicidad += 10;
    taco.energia -= 5;

    updateUI();
    showNotification('🍖 Has alimentado a Taco');
}

// Jugar con Taco
function playWithTaco() {
    taco.felicidad += 25;
    taco.energia -= 20;
    taco.hambre += 15;

    updateUI();
    showNotification('🎾 Has jugado con Taco');
}

// Hacer dormir a Taco
function makeTacoSleep() {
    taco.energia += 40;
    taco.hambre += 10;
    taco.felicidad += 5;

    updateUI();
    showNotification('💤 Taco está durmiendo...');
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// === SISTEMA AUTOMÁTICO ===
// Cada 3 segundos, los estados de Taco cambian naturalmente
function autoDecay() {
    taco.hambre += 2;
    taco.energia -= 1;
    taco.felicidad -= 0.5;

    updateUI();
}

// Event Listeners
feedBtn.addEventListener('click', feedTaco);
playBtn.addEventListener('click', playWithTaco);
sleepBtn.addEventListener('click', makeTacoSleep);

// Añadir estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicialización
updateUI();

// Iniciar el decay automático
setInterval(autoDecay, 3000);

// Guardar el estado cada vez que cambia (opcional)
window.addEventListener('beforeunload', () => {
    localStorage.setItem('tacoState', JSON.stringify(taco));
});

// Cargar estado guardado al iniciar (opcional)
window.addEventListener('load', () => {
    const savedState = localStorage.getItem('tacoState');
    if (savedState) {
        taco = JSON.parse(savedState);
        updateUI();
    }
});
