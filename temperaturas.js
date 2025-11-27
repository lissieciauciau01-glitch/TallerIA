// ===== CONVERSOR DE TEMPERATURAS =====
// Funciones para convertir entre diferentes escalas de temperatura

/**
 * Convierte grados Celsius a Fahrenheit
 * Fórmula: (C × 9/5) + 32
 * @param {number} celsius - Temperatura en grados Celsius
 * @returns {number} Temperatura en grados Fahrenheit
 */
function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Convierte grados Celsius a Kelvin
 * Fórmula: C + 273.15
 * @param {number} celsius - Temperatura en grados Celsius
 * @returns {number} Temperatura en Kelvin
 */
function celsiusAKelvin(celsius) {
    return celsius + 273.15;
}

/**
 * Función principal que convierte Celsius a ambas escalas
 * @param {number} celsius - Temperatura en grados Celsius
 * @returns {object} Objeto con las conversiones
 */
function convertirTemperatura(celsius) {
    // Validar que el input sea un número
    if (isNaN(celsius)) {
        return { error: "Por favor, ingresa un número válido" };
    }

    // Realizar las conversiones
    const fahrenheit = celsiusAFahrenheit(celsius);
    const kelvin = celsiusAKelvin(celsius);

    // Retornar un objeto con los resultados redondeados a 2 decimales
    return {
        celsius: celsius,
        fahrenheit: Math.round(fahrenheit * 100) / 100,
        kelvin: Math.round(kelvin * 100) / 100
    };
}

// ===== EJEMPLOS DE USO =====
console.log(convertirTemperatura(0));      // 0°C = 32°F, 273.15K
console.log(convertirTemperatura(25));     // 25°C = 77°F, 298.15K
console.log(convertirTemperatura(100));    // 100°C = 212°F, 373.15K
console.log(convertirTemperatura(-40));    // -40°C = -40°F, 233.15K