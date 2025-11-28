// Variables globales
let allBreeds = [];
let currentBreeds = [];
let currentPage = 1;
const breedsPerPage = 24; // 6 columnas x 4 filas
let totalPages = 1;
let isSearching = false;

// Elementos del DOM
const dogsGrid = document.getElementById('dogsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const showAllBtn = document.getElementById('showAllBtn');
const randomBtn = document.getElementById('randomBtn');
const pagination = document.getElementById('pagination');

// URL base de la API
const API_BASE = 'https://dog.ceo/api';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadAllBreeds();
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
            displayCurrentPage();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPage();
        }
    });

    showAllBtn.addEventListener('click', () => {
        resetSearch();
    });

    randomBtn.addEventListener('click', () => {
        loadRandomBreeds();
    });
}

// Cargar todas las razas
async function loadAllBreeds() {
    showLoading();

    try {
        const response = await fetch(`${API_BASE}/breeds/list/all`);

        if (!response.ok) {
            throw new Error('Error al cargar las razas');
        }

        const data = await response.json();

        // Convertir el objeto de razas a un array
        allBreeds = [];
        for (const [breed, subBreeds] of Object.entries(data.message)) {
            if (subBreeds.length === 0) {
                allBreeds.push(breed);
            } else {
                subBreeds.forEach(subBreed => {
                    allBreeds.push(`${breed} ${subBreed}`);
                });
            }
        }

        currentBreeds = [...allBreeds];
        totalPages = Math.ceil(currentBreeds.length / breedsPerPage);
        currentPage = 1;
        displayCurrentPage();

    } catch (error) {
        showError('No se pudieron cargar las razas. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Cargar razas aleatorias
async function loadRandomBreeds() {
    showLoading();

    try {
        // Mezclar el array de razas
        const shuffled = [...allBreeds].sort(() => Math.random() - 0.5);
        currentBreeds = shuffled;
        totalPages = Math.ceil(currentBreeds.length / breedsPerPage);
        currentPage = 1;
        isSearching = true;
        displayCurrentPage();

    } catch (error) {
        showError('Error al cargar razas aleatorias.');
        console.error('Error:', error);
    }
}

// Manejar búsqueda
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        resetSearch();
        return;
    }

    isSearching = true;
    const filtered = allBreeds.filter(breed =>
        breed.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        showNoResults(query);
        return;
    }

    currentBreeds = filtered;
    totalPages = Math.ceil(currentBreeds.length / breedsPerPage);
    currentPage = 1;
    displayCurrentPage();
}

// Resetear búsqueda
function resetSearch() {
    isSearching = false;
    searchInput.value = '';
    currentBreeds = [...allBreeds];
    totalPages = Math.ceil(currentBreeds.length / breedsPerPage);
    currentPage = 1;
    displayCurrentPage();
}

// Mostrar página actual
function displayCurrentPage() {
    const startIndex = (currentPage - 1) * breedsPerPage;
    const endIndex = startIndex + breedsPerPage;
    const breedsToShow = currentBreeds.slice(startIndex, endIndex);

    renderBreeds(breedsToShow);
    updatePagination();
}

// Renderizar razas
async function renderBreeds(breeds) {
    dogsGrid.innerHTML = '';

    for (const breed of breeds) {
        const card = await createBreedCard(breed);
        dogsGrid.appendChild(card);
    }
}

// Crear tarjeta de raza
async function createBreedCard(breedName) {
    const card = document.createElement('div');
    card.className = 'card';

    // Determinar si es una subrraza o raza principal
    const breedParts = breedName.split(' ');
    let imageUrl = '';
    let breedPath = '';

    if (breedParts.length === 2) {
        // Es una subrraza (ej: "hound afghan")
        breedPath = `${breedParts[0]}/${breedParts[1]}`;
    } else {
        // Es una raza principal
        breedPath = breedName;
    }

    // Primero mostrar la estructura de la tarjeta
    card.innerHTML = `
        <div class="card-image-container">
            <div class="image-loading">Cargando...</div>
        </div>
        <h3 class="card-name">${breedName}</h3>
        <div class="card-info">
            <span class="card-label">🐾 Tipo:</span>
            <span class="card-value">Raza de perro</span>
        </div>
        <div class="card-info">
            <span class="card-label">📸 Estado:</span>
            <span class="card-value">Imagen disponible</span>
        </div>
        <div class="breed-badge">Ver más información</div>
    `;

    // Cargar imagen de forma asíncrona
    fetchBreedImage(breedPath).then(url => {
        const imgContainer = card.querySelector('.card-image-container');
        if (url) {
            imgContainer.innerHTML = `<img src="${url}" alt="${breedName}" class="card-image">`;
        } else {
            imgContainer.innerHTML = `<div class="image-loading">Sin imagen</div>`;
        }
    });

    return card;
}

// Obtener imagen de una raza
async function fetchBreedImage(breedPath) {
    try {
        const response = await fetch(`${API_BASE}/breed/${breedPath}/images/random`);

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.message;

    } catch (error) {
        console.error('Error al cargar imagen:', error);
        return null;
    }
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
    dogsGrid.innerHTML = `
        <div class="loading">
            🐕 Cargando razas de perros...
        </div>
    `;
}

// Mostrar error
function showError(message) {
    dogsGrid.innerHTML = `
        <div class="error">
            ❌ ${message}
        </div>
    `;
}

// Mostrar sin resultados
function showNoResults(query) {
    dogsGrid.innerHTML = `
        <div class="no-results">
            <h2>🔍 No se encontraron resultados</h2>
            <p>No hay razas que coincidan con "${query}"</p>
            <button onclick="resetSearch()" style="margin-top: 1rem;">Ver todas las razas</button>
        </div>
    `;
    pagination.style.display = 'none';
}
