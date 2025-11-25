//suma dos numeros en js
// Función que suma dos números, con comentarios línea por línea
function suma(a, b) {
	// Recibimos los argumentos a y b (pueden ser números o cadenas que parezcan números)

	// Convertimos el primer argumento a un número.
	// Usamos Number() porque acepta enteros y decimales.
	var numA = Number(a);

	// Convertimos el segundo argumento a un número.
	var numB = Number(b);

	// Comprobamos si la conversión produjo "NaN" (Not-a-Number).
	// isNaN devuelve true si el valor no se puede interpretar como número.
	if (isNaN(numA) || isNaN(numB)) {
		// Si alguno no es número, lanzamos un error indicando el problema.
		throw new TypeError('Ambos argumentos deben ser números');
	}

	// Sumamos los dos números ya validados.
	var resultado = numA + numB;

	// Devolvemos el resultado de la suma.
	return resultado;
}

/*
Título: ¿Qué es una "variable"?

- Analogía visual:
  Imagina una caja de mudanza con una etiqueta: la etiqueta es el nombre y lo que guardas dentro es el valor.
  Puedes abrir la caja y cambiar su contenido, o sustituirlo por completo sin cambiar la etiqueta.
  La etiqueta ayuda a encontrar la caja cuando la necesitas.

- Explicación técnica:
  Una variable es un nombre que apunta a un valor; el tipo describe qué clase de valor es (número, texto...).
  Asignar guarda un valor en el nombre; reasignar lo reemplaza por otro valor.

- Ejemplo práctico en JavaScript:
let caja = "libros"; // declarar y asignar: la "etiqueta" caja guarda "libros"
caja = "ropa";       // reasignar: abrimos la misma caja y cambiamos su contenido
let otraCaja = caja; // copiar el contenido actual a otra "caja"

- Buenas prácticas:
  • Nombres descriptivos y claros (ej. totalPrecio, nombreUsuario).  
  • Usar tipos adecuados y consistentes.  
  • Inicializar variables cuando corresponda.

- Versión ultra breve:
  Una variable es una etiqueta que guarda un valor.

- Versión para niños:
  Una variable es como una caja con una etiqueta donde guardas cosas. Puedes cambiar lo que hay dentro sin cambiar la etiqueta.
*/



