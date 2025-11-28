//ejercicio:area y volumenes
//Objetivo crear multiples funciones y reutilizables
//crea una funcion para calcular el area de un circulo dado su radio}
/**
 * Calcula el área de un círculo dado su radio.
 * @param {number} radio - El radio del círculo.
 * @returns {number} El área calculada del círculo.
 * @example
 * // Para calcular el área de un círculo con radio 5:
 * const area = areaCirculo(5); // area será aproximadamente 78.5398
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
//crea una funcion para calcular el area de un rectangulo dado su base y altura
function areaRectangulo(base, altura) {
    return base * altura;
}
/**
 * Calcula el área de un rectángulo dadas su base y altura.
 * @param {number} base - La longitud de la base del rectángulo.
 * @param {number} altura - La altura del rectángulo.
 * @returns {number} El área calculada del rectángulo.
 * @example
 * // Para calcular el área de un rectángulo con base 10 y altura 5:
 * const area = areaRectangulo(10, 5); // area será 50
 */
//crea una funcion para calcular el volumen de un cilindro
//crea la funcion 'calcularVolumenCilindro reutilizando la funcion 'areaCirculo
/**
 * Calcula el volumen de un cilindro dado su radio y altura.
 * Reutiliza la función `areaCirculo` para calcular el área de la base.
 * @param {number} radio - El radio de la base del cilindro.
 * @param {number} altura - La altura del cilindro.
 * @returns {number} El volumen calculado del cilindro.
 * @example
 * // Para calcular el volumen de un cilindro con radio 3 y altura 10:
 * const volumen = calcularVolumenCilindro(3, 10); // volumen será aproximadamente 282.743
 */
function calcularVolumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}
//crea una funcion para caluclar una derivada simple de una funcion polinomial de grado n
/**
 * Calcula la derivada simple de una función polinomial.
 * La función polinomial se representa como un array de coeficientes,
 * donde el índice del array corresponde a la potencia de x.
 * Por ejemplo, `[a0, a1, a2]` representa `a2*x^2 + a1*x + a0`.
 *
 * @param {number[]} coeficientes - Un array de coeficientes del polinomio.
 *                                  coeficientes[i] es el coeficiente de x^i.
 * @returns {number[]} Un array de coeficientes de la derivada del polinomio.
 *                     Si el polinomio es una constante, retorna un array con [0].
 * @example
 * // Para el polinomio 3x^2 + 2x + 1 (coeficientes: [1, 2, 3])
 * // La derivada es 6x + 2 (coeficientes: [2, 6])
 * const derivada = derivarPolinomio([1, 2, 3]); // derivada será [2, 6]
 * @example
 * // Para el polinomio 5x^3 + 4x^2 + 3x + 2 (coeficientes: [2, 3, 4, 5])
 * // La derivada es 15x^2 + 8x + 3 (coeficientes: [3, 8, 15])
 * const derivada2 = derivarPolinomio([2, 3, 4, 5]); // derivada2 será [3, 8, 15]
 * @example
 * // Para una constante 7 (coeficientes: [7])
 * // La derivada es 0 (coeficientes: [0])
 * const derivada3 = derivarPolinomio([7]); // derivada3 será [0]
 */
function derivarPolinomio(coeficientes) {
    if (coeficientes.length <= 1) {
        return [0]; // La derivada de una constante es 0
    }

    const derivadaCoeficientes = [];
    for (let i = 1; i < coeficientes.length; i++) {
        derivadaCoeficientes.push(i * coeficientes[i]);
    }
    return derivadaCoeficientes;
}
