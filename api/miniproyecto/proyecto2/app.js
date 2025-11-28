// Variables globales
let allFacts = [];
let currentPage = 1;
const factsPerPage = 9; // 3 columnas x 3 filas
let totalPages = 1;

// Elementos del DOM
const factsGrid = document.getElementById('factsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const loadFactsBtn = document.getElementById('loadFactsBtn');
const allFactsBtn = document.getElementById('allFactsBtn');
const pagination = document.getElementById('pagination');
const statsBox = document.getElementById('statsBox');
const statsText = document.getElementById('statsText');

// URLs de las APIs
const CAT_FACT_API = 'https://catfact.ninja/facts';
const CAT_IMAGE_API = 'https://api.thecatapi.com/v1/images/search';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadInitialFacts();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    loadFactsBtn.addEventListener('click', () => {
        loadInitialFacts();
    });

    allFactsBtn.addEventListener('click', () => {
        loadAllFacts();
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
        }
    });
}

// Cargar datos iniciales
async function loadInitialFacts() {
    showLoading();

    try {
        // Cargar aproximadamente 9 datos curiosos
        const response = await fetch(`${CAT_FACT_API}?limit=9&page=1`);

        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }

        const data = await response.json();
        allFacts = data.data;

        totalPages = 1;
        currentPage = 1;
        displayCurrentPage();
        updateStats(data.total);

    } catch (error) {
        showError('No se pudieron cargar los datos curiosos. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Cargar todos los datos disponibles
async function loadAllFacts() {
    showLoading();
    statsBox.style.display = 'block';

    try {
        // Primero obtener el total de páginas
        const initialResponse = await fetch(`${CAT_FACT_API}?limit=100&page=1`);

        if (!initialResponse.ok) {
            throw new Error('Error al cargar los datos');
        }

        const initialData = await initialResponse.json();
        allFacts = initialData.data;

        totalPages = Math.ceil(allFacts.length / factsPerPage);
        currentPage = 1;
        displayCurrentPage();
        updateStats(initialData.total);

    } catch (error) {
        showError('No se pudieron cargar todos los datos. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Mostrar página actual
function displayCurrentPage() {
    const startIndex = (currentPage - 1) * factsPerPage;
    const endIndex = startIndex + factsPerPage;
    const factsToShow = allFacts.slice(startIndex, endIndex);

    renderFacts(factsToShow);
    updatePagination();
}

// Renderizar datos curiosos
async function renderFacts(facts) {
    factsGrid.innerHTML = '';

    for (const fact of facts) {
        const card = await createFactCard(fact);
        factsGrid.appendChild(card);
    }
}

// Crear tarjeta de dato curioso
async function createFactCard(fact) {
    const card = document.createElement('div');
    card.className = 'card';

    // Calcular estadísticas del texto
    const wordCount = fact.fact.split(' ').length;
    const factLength = fact.fact.length;

    card.innerHTML = `
        <div class="card-image-container">
            <div class="image-loading">🐱</div>
        </div>
        <div class="card-fact">${fact.fact}</div>
        <div class="card-info">
            <span class="card-label">📏 Longitud:</span>
            <span class="card-value">${factLength} caracteres</span>
        </div>
        <div class="card-info">
            <span class="card-label">📝 Palabras:</span>
            <span class="card-value">${wordCount} palabras</span>
        </div>
        <div class="card-info">
            <span class="card-label">📊 Estado:</span>
            <span class="card-value">Verificado</span>
        </div>
        <div class="fact-badge">Dato Curioso #${allFacts.indexOf(fact) + 1}</div>
    `;

    // Cargar imagen de gato de forma asíncrona
    fetchCatImage().then(imageUrl => {
        const imgContainer = card.querySelector('.card-image-container');
        if (imageUrl) {
            imgContainer.innerHTML = `<img src="${imageUrl}" alt="Gato" class="card-image">`;
        } else {
            imgContainer.innerHTML = `<div class="image-loading">🐱</div>`;
        }
    });

    return card;
}

// Obtener imagen aleatoria de gato
async function fetchCatImage() {
    try {
        const response = await fetch(CAT_IMAGE_API);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data[0].url;

    } catch (error) {
        console.error('Error al cargar imagen:', error);
        return null;
    }
}

// Actualizar estadísticas
function updateStats(total) {
    statsBox.style.display = 'block';
    statsText.textContent = `Total de datos curiosos disponibles: ${total} | Mostrando: ${allFacts.length}`;
}

// Actualizar paginación
function updatePagination() {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';
}

// Mostrar loading
function showLoading() {
    factsGrid.innerHTML = `
        <div class="loading">
            🐱 Cargando datos curiosos sobre gatos...
        </div>
    `;
}

// Mostrar error
function showError(message) {
    factsGrid.innerHTML = `
        <div class="error">
            ❌ ${message}
        </div>
    `;
    pagination.style.display = 'none';
}
