// ===== GENERADOR DE COLORES ALEATORIOS =====
// Script interactivo para generar y copiar códigos de colores hexadecimales

// Seleccionar elementos del DOM
const colorDisplay = document.getElementById('colorDisplay');
const codigoHex = document.getElementById('codigoHex');
const btnGenerar = document.getElementById('btnGenerar');
const btnCopiar = document.getElementById('btnCopiar');
const confirmacion = document.getElementById('confirmacion');

// Variable global para almacenar el color actual
let colorActual = '#667EEA';

/**
 * Genera un color hexadecimal aleatorio
 * Rango: #000000 a #FFFFFF
 * @returns {string} Color en formato hexadecimal (ej: #A3F5B2)
 */
function generarColorAleatorio() {
    // Generar 3 números aleatorios entre 0-255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convertir cada número a hexadecimal y añadir 0 si es necesario
    // toString(16) convierte a base 16 (hexadecimal)
    // padStart(2, '0') asegura que tenga 2 dígitos
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Retornar el color en formato #RRGGBB
    return `#${hexR}${hexG}${hexB}`.toUpperCase();
}

/**
 * Actualiza la página con un nuevo color aleatorio
 * Cambia:
 * - El fondo del div colorDisplay
 * - El texto del código hexadecimal
 * - La variable colorActual
 * - Aplica animación visual
 */
function cambiarColor() {
    // Generar nuevo color
    colorActual = generarColorAleatorio();

    // Cambiar el color de fondo del div
    colorDisplay.style.backgroundColor = colorActual;

    // Actualizar el texto del código hexadecimal
    codigoHex.textContent = colorActual;

    // Agregar clase para animación
    colorDisplay.classList.remove('change');
    // Hacer reflow para reiniciar la animación
    void colorDisplay.offsetWidth;
    colorDisplay.classList.add('change');

    // Ocultar confirmación si estaba visible
    confirmacion.classList.remove('visible');
}

/**
 * Copia el código hexadecimal al portapapeles
 * Muestra una confirmación visual temporal
 */
function copiarAlPortapapeles() {
    // Usar la API moderna del navegador para copiar al portapapeles
    navigator.clipboard.writeText(colorActual).then(() => {
        // Si la copia fue exitosa, mostrar confirmación
        confirmacion.classList.add('visible');

        // Ocultar la confirmación después de 2 segundos
        setTimeout(() => {
            confirmacion.classList.remove('visible');
        }, 2000);
    }).catch(() => {
        // Si hay error, mostrar alerta al usuario
        alert('Error al copiar. Intenta de nuevo.');
    });
}

/**
 * Configura los event listeners (escuchadores de eventos)
 * Vincula los botones con sus funciones correspondientes
 */
function configurarEventos() {
    // Evento click en botón "Generar Color"
    btnGenerar.addEventListener('click', cambiarColor);

    // Evento click en botón "Copiar Código"
    btnCopiar.addEventListener('click', copiarAlPortapapeles);

    // Evento para presionar ENTER (genera color nuevo)
    document.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            cambiarColor();
        }
    });
}

// Inicializar: configurar los eventos cuando carga la página
configurarEventos();

// Generar un color inicial al cargar la página
cambiarColor();