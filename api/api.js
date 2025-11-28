// Variables globales
let currentPage = 1;
let totalPages = 1;
let isSearching = false;
let currentSearchQuery = '';

// Elementos del DOM
const characterGrid = document.getElementById('characterGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

// URL base de la API
const API_BASE = 'https://rickandmortyapi.com/api/character';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadCharacters(currentPage);
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '' && isSearching) {
            resetSearch();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            if (isSearching) {
                searchCharacters(currentSearchQuery, currentPage);
            } else {
                loadCharacters(currentPage);
            }
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            if (isSearching) {
                searchCharacters(currentSearchQuery, currentPage);
            } else {
                loadCharacters(currentPage);
            }
        }
    });
}

// Cargar personajes
async function loadCharacters(page = 1) {
    showLoading();

    try {
        const response = await fetch(`${API_BASE}?page=${page}`);

        if (!response.ok) {
            throw new Error('Error al cargar los personajes');
        }

        const data = await response.json();
        totalPages = data.info.pages;
        renderCharacters(data.results);
        updatePagination();

    } catch (error) {
        showError('No se pudieron cargar los personajes. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Buscar personajes
async function searchCharacters(query, page = 1) {
    if (!query.trim()) {
        resetSearch();
        return;
    }

    showLoading();
    isSearching = true;
    currentSearchQuery = query;

    try {
        const response = await fetch(`${API_BASE}?name=${encodeURIComponent(query)}&page=${page}`);

        if (!response.ok) {
            if (response.status === 404) {
                showNoResults(query);
                return;
            }
            throw new Error('Error en la búsqueda');
        }

        const data = await response.json();
        totalPages = data.info.pages;
        renderCharacters(data.results);
        updatePagination();

    } catch (error) {
        showError('Error al buscar personajes. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Manejar búsqueda
function handleSearch() {
    const query = searchInput.value.trim();
    currentPage = 1;
    searchCharacters(query, 1);
}

// Resetear búsqueda
function resetSearch() {
    isSearching = false;
    currentSearchQuery = '';
    currentPage = 1;
    searchInput.value = '';
    loadCharacters(1);
}

// Renderizar personajes
function renderCharacters(characters) {
    characterGrid.innerHTML = '';

    characters.forEach(character => {
        const card = createCharacterCard(character);
        characterGrid.appendChild(card);
    });
}

// Crear tarjeta de personaje
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';

    const statusClass = character.status.toLowerCase();

    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="card-image">
        <h3 class="card-name">${character.name}</h3>
        
        <div class="card-info">
            <span class="card-label">Estado:</span>
            <span class="status-badge status-${statusClass}">${character.status}</span>
        </div>
        
        <div class="card-info">
            <span class="card-label">Especie:</span>
            <span class="card-value">${character.species}</span>
        </div>
        
        <div class="card-info">
            <span class="card-label">Género:</span>
            <span class="card-value">${character.gender}</span>
        </div>
        
        <div class="card-info">
            <span class="card-label">Ubicación:</span>
            <span class="card-value">${character.location.name}</span>
        </div>
    `;

    return card;
}

// Actualizar paginación
function updatePagination() {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Mostrar loading
function showLoading() {
    characterGrid.innerHTML = `
        <div class="loading">
            Cargando personajes...
        </div>
    `;
}

// Mostrar error
function showError(message) {
    characterGrid.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
    updatePagination();
}

// Mostrar sin resultados
function showNoResults(query) {
    characterGrid.innerHTML = `
        <div class="no-results">
            <h2>No se encontraron resultados</h2>
            <p>No hay personajes que coincidan con "${query}"</p>
            <button onclick="resetSearch()" style="margin-top: 1rem;">Ver todos los personajes</button>
        </div>
    `;
    totalPages = 1;
    updatePagination();
}
