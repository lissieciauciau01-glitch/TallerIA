document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const checkBtn = document.getElementById('checkBtn');
    const resultDiv = document.getElementById('result');

    const isPalindrome = (str) => {
        // Eliminar espacios, signos de puntuación y convertir a minúsculas
        const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
        // Invertir la cadena limpia
        const reversedStr = cleanStr.split('').reverse().join('');
        return cleanStr === reversedStr && cleanStr.length > 0;
    };

    const checkPalindrome = () => {
        const text = inputText.value.trim();

        if (!text) {
            showResult('Por favor, ingresa un texto válido', false, true);
            return;
        }

        const result = isPalindrome(text);

        if (result) {
            showResult(`¡Es un palíndromo! "${text}"`, true);
        } else {
            showResult(`No es un palíndromo: "${text}"`, false);
        }
    };

    const showResult = (message, isSuccess, isWarning = false) => {
        resultDiv.className = ''; // Reset classes
        resultDiv.classList.add('show');

        if (isWarning) {
            resultDiv.style.color = '#f59e0b';
            resultDiv.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
            resultDiv.style.border = '1px solid rgba(245, 158, 11, 0.2)';
            resultDiv.innerHTML = `<span class="icon">⚠️</span>${message}`;
        } else if (isSuccess) {
            resultDiv.classList.add('is-palindrome');
            resultDiv.innerHTML = `<span class="icon">✨</span>${message}`;
        } else {
            resultDiv.classList.add('not-palindrome');
            resultDiv.innerHTML = `<span class="icon">❌</span>${message}`;
        }
    };

    // Event Listeners
    checkBtn.addEventListener('click', checkPalindrome);

    inputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPalindrome();
        }
    });

    // Limpiar resultado al escribir de nuevo
    inputText.addEventListener('input', () => {
        if (resultDiv.classList.contains('show')) {
            resultDiv.classList.remove('show');
        }
    });
});