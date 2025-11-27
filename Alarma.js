// ===== RELOJ DIGITAL CON ALARMA =====
// Sistema interactivo de reloj y alarma en tiempo real

// === VARIABLES GLOBALES ===
let alarmaActiva = false;
let horaSonando = false;
let formato24 = true;
let audioAlarma = null;

// === ELEMENTOS DEL DOM ===
const relojDigital = document.getElementById('relojDigital');
const fecha = document.getElementById('fecha');
const saludo = document.getElementById('saludo');
const inputAlarma = document.getElementById('inputAlarma');
const btnAlarma = document.getElementById('btnAlarma');
const btnDetener = document.getElementById('btnDetener');
const estadoAlarma = document.getElementById('estadoAlarma');
const btnToggleFormato = document.getElementById('btnToggleFormato');

// Obtener saludo según la hora
function obtenerSaludo(hora) {
    if (hora >= 6 && hora < 12) {
        return '¡Buenos días! 🌅';
    } else if (hora >= 12 && hora < 18) {
        return '¡Buenas tardes! ☀️';
    } else {
        return '¡Buenas noches! 🌙';
    }
}

// Formatear hora según formato seleccionado
function formatearHora(horas, minutos, segundos) {
    if (formato24) {
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    } else {
        let horas12 = horas % 12 || 12;
        const periodo = horas >= 12 ? 'PM' : 'AM';
        return `${String(horas12).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')} ${periodo}`;
    }
}

// Actualizar reloj
function actualizarReloj() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    relojDigital.textContent = formatearHora(horas, minutos, segundos);
    saludo.textContent = obtenerSaludo(horas);

    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const anio = ahora.getFullYear();
    fecha.textContent = `${dia}/${mes}/${anio}`;

    verificarAlarma(horas, minutos);
}

// Verificar si la alarma debe sonar
function verificarAlarma(horas, minutos) {
    if (!alarmaActiva) return;

    const [horaAlarma, minutosAlarma] = inputAlarma.value.split(':').map(Number);

    if (horas === horaAlarma && minutos === minutosAlarma && !horaSonando) {
        horaSonando = true;
        sonarAlarma();
    }

    if (horas !== horaAlarma || minutos !== minutosAlarma) {
        horaSonando = false;
    }
}

// Sonar alarma
function sonarAlarma() {
    estadoAlarma.textContent = '⏰ ¡ALARMA SONANDO!';
    estadoAlarma.classList.add('alarma-activa', 'activada');
    relojDigital.classList.add('sonando');
    btnDetener.style.display = 'block';

    // Crear sonido de alarma (beep)
    reproducirSonido();
}

// Reproducir sonido de alarma
function reproducirSonido() {
    const contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    const oscilador = contextoAudio.createOscillator();
    const ganancia = contextoAudio.createGain();

    oscilador.connect(ganancia);
    ganancia.connect(contextoAudio.destination);

    oscilador.frequency.value = 800;
    oscilador.type = 'sine';

    ganancia.gain.setValueAtTime(0.3, contextoAudio.currentTime);
    ganancia.gain.exponentialRampToValueAtTime(0.01, contextoAudio.currentTime + 0.5);

    oscilador.start(contextoAudio.currentTime);
    oscilador.stop(contextoAudio.currentTime + 0.5);
}

// Activar/Desactivar alarma
btnAlarma.addEventListener('click', () => {
    if (!inputAlarma.value) {
        alert('Por favor, selecciona una hora');
        return;
    }

    alarmaActiva = !alarmaActiva;

    if (alarmaActiva) {
        btnAlarma.classList.add('activo');
        btnAlarma.textContent = 'Alarma Activa';
        estadoAlarma.textContent = `✓ Alarma configurada para las ${inputAlarma.value}`;
        estadoAlarma.classList.add('alarma-activa');
        estadoAlarma.classList.remove('activada');
        inputAlarma.disabled = true;
    } else {
        btnAlarma.classList.remove('activo');
        btnAlarma.textContent = 'Activar Alarma';
        estadoAlarma.textContent = 'Alarma desactivada';
        estadoAlarma.classList.remove('alarma-activa', 'activada');
        inputAlarma.disabled = false;
        btnDetener.style.display = 'none';
        relojDigital.classList.remove('sonando');
        horaSonando = false;
    }
});

// Detener alarma
btnDetener.addEventListener('click', () => {
    horaSonando = false;
    estadoAlarma.textContent = `✓ Alarma configurada para las ${inputAlarma.value}`;
    estadoAlarma.classList.remove('activada');
    relojDigital.classList.remove('sonando');
    btnDetener.style.display = 'none';
});

// Toggle formato 12/24h
btnToggleFormato.addEventListener('click', () => {
    formato24 = !formato24;
    btnToggleFormato.textContent = formato24 ? 'Cambiar a 12h' : 'Cambiar a 24h';
});

// Actualizar reloj cada segundo
setInterval(actualizarReloj, 1000);
actualizarReloj();

console.log('✅ Reloj digital con alarma cargado correctamente');