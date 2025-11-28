// analisis-texto.js
// Lógica para el editor de texto y las estadísticas en tiempo real

// ===== Elementos del DOM =====
const textarea = document.getElementById('texto');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnCopiar = document.getElementById('btnCopiar');
const mensaje = document.getElementById('mensaje');

const elCharsCon = document.getElementById('charsCon');
const elCharsSin = document.getElementById('charsSin');
const elPalabras = document.getElementById('palabras');
const elOraciones = document.getElementById('oraciones');
const elTiempo = document.getElementById('tiempo');

// ========= Parámetros ========
const PALABRAS_POR_MINUTO = 200; // base para tiempo estimado

// ======= Funciones de utilidad ======

/**
 * Animar brevemente un elemento cuando su valor cambia.
 * Añade la clase .pulse y la retira tras la transición.
 */
function animarElemento(el){
  if(!el) return;
  el.classList.add('pulse');
  // quitar la clase después de 220ms
  setTimeout(()=> el.classList.remove('pulse'), 220);
}

/**
 * Contar palabras en un texto.
 * Considera múltiples espacios y saltos de línea: usa regex \s+ y filtra vacíos.
 * Devuelve 0 si el texto está vacío o sólo contiene espacios.
 */
function contarPalabras(text){
  if(!text) return 0;
  const trimmed = text.trim();
  if(trimmed === '') return 0;
  // dividir por cualquier secuencia de whitespace (espacios, tab, nueva línea)
  const palabras = trimmed.split(/\s+/).filter(Boolean);
  return palabras.length;
}

/**
 * Contar oraciones en un texto.
 * Se basa en los delimitadores . ? ! y sus combinaciones, evitando entradas vacías.
 */
function contarOraciones(text){
  if(!text) return 0;
  // Reemplaza saltos de línea por espacio para normalizar
  const normal = text.replace(/\n+/g,' ');
  // Split por uno o más de ., ? o !
  const partes = normal.split(/[\.\?\!]+/).map(s => s.trim()).filter(Boolean);
  return partes.length;
}

/**
 * Calcular tiempo estimado de lectura basado en palabras por minuto.
 * Devuelve string legible con minutos (y segundos si <1 min).
 */
function calcularTiempoLectura(palabras, wpm = PALABRAS_POR_MINUTO){
  if(!palabras || palabras === 0) return '0 min';
  const minutos = palabras / wpm; // en minutos
  if(minutos < 1){
    const segundos = Math.ceil(minutos * 60);
    return `${segundos} seg`;
  }
  const mins = Math.floor(minutos);
  const frac = minutos - mins;
  const secs = Math.round(frac * 60);
  return secs === 0 ? `${mins} min` : `${mins} min ${secs} s`;
}

/**
 * Actualiza todas las métricas en pantalla a partir del texto actual.
 * Valida texto vacío y maneja errores básicos con try/catch.
 */
function actualizarEstadisticas(){
  try{
    const text = textarea.value || '';

    // validación: texto vacío
    if(text.trim() === ''){
      elCharsCon.textContent = '0'; animarElemento(elCharsCon);
      elCharsSin.textContent = '0'; animarElemento(elCharsSin);
      elPalabras.textContent = '0'; animarElemento(elPalabras);
      elOraciones.textContent = '0'; animarElemento(elOraciones);
      elTiempo.textContent = '0 min'; animarElemento(elTiempo);
      mensaje.textContent = 'El texto está vacío.';
      btnCopiar.disabled = true;
      return;
    }

    // cálculo de métricas
    const charsCon = text.length;
    const charsSin = text.replace(/\s+/g, '').length;
    const palabras = contarPalabras(text);
    const oraciones = contarOraciones(text);
    const tiempo = calcularTiempoLectura(palabras);

    // actualizar DOM
    elCharsCon.textContent = String(charsCon);
    animarElemento(elCharsCon);

    elCharsSin.textContent = String(charsSin);
    animarElemento(elCharsSin);

    elPalabras.textContent = String(palabras);
    animarElemento(elPalabras);

    elOraciones.textContent = String(oraciones);
    animarElemento(elOraciones);

    elTiempo.textContent = String(tiempo);
    animarElemento(elTiempo);

    mensaje.textContent = '';
    btnCopiar.disabled = false;

  } catch(err){
    // manejo básico de errores
    console.error('Error actualizando estadísticas:', err);
    mensaje.textContent = 'Ocurrió un error al procesar el texto.';
  }
}

/**
 * Copia las estadísticas actuales al portapapeles en formato legible.
 * Maneja fallbacks y muestra mensajes sobre el resultado.
 */
async function copiarEstadisticas(){
  try{
    const contenido = `Caracteres (con espacios): ${elCharsCon.textContent}\n` +
                      `Caracteres (sin espacios): ${elCharsSin.textContent}\n` +
                      `Palabras: ${elPalabras.textContent}\n` +
                      `Oraciones: ${elOraciones.textContent}\n` +
                      `Tiempo estimado de lectura: ${elTiempo.textContent}`;

    if(navigator.clipboard && navigator.clipboard.writeText){
      await navigator.clipboard.writeText(contenido);
      mensaje.textContent = 'Estadísticas copiadas al portapapeles.';
    } else {
      // fallback: crear textarea temporal
      const tmp = document.createElement('textarea');
      tmp.value = contenido;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      mensaje.textContent = 'Estadísticas copiadas (método alternativo).';
    }

  } catch(err){
    console.error('Error copiando estadísticas:', err);
    mensaje.textContent = 'No se pudo copiar las estadísticas.';
  }
}

/**
 * Limpiar el área de texto y resetear las métricas.
 */
function limpiar(){
  textarea.value = '';
  actualizarEstadisticas();
  mensaje.textContent = 'Área limpiada.';
}

// ======= Eventos ========

// Actualizar en tiempo real mientras el usuario escribe
textarea.addEventListener('input', actualizarEstadisticas);

// Botones
btnLimpiar.addEventListener('click', limpiar);
btnCopiar.addEventListener('click', copiarEstadisticas);

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  // deshabilitar copiar si está vacío
  btnCopiar.disabled = true;
  actualizarEstadisticas();
});
