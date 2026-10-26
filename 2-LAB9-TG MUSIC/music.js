
const DATA_URL = 'music.json';

const productGrid = document.getElementById('product-grid');
const detailSection = document.getElementById('detail-section');
const detailCard = document.getElementById('detail-card');
const closeBtn = document.getElementById('close-btn');

let musicData = [];

async function loadMusic() {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        musicData = await response.json();
        renderMusicList(musicData);

    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
        productGrid.innerHTML =
            '<p>Не удалось загрузить музыку. Проверь файлы проекта.</p>';
    }
}

function renderMusicList(music) {
    productGrid.innerHTML = '';

    music.forEach(track => {
        const card = document.createElement('div');
        card.className = 'music-card';

        card.innerHTML = `
            <img src="${track.image}" alt="${track.name}"
                 class="music-img">

            <div class="music-info">
                <h3 class="music-title">${track.name}</h3>
                <p class="music-artist">${track.artist}</p>
                <p class="music-genre">${track.genre}</p>
                <span class="music-year">${track.year}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            showMusicDetail(track.id);
        });

        productGrid.appendChild(card);
    });
}

function showMusicDetail(trackId) {
    const track = musicData.find(item => item.id === trackId);

    if (!track) return;

    detailCard.innerHTML = `
        <div class="detail-layout">
            <img src="${track.image}" alt="${track.name}"
                 class="detail-img">

            <h2>${track.name}</h2>
            <p class="detail-artist">${track.artist}</p>

            <p>${track.description}</p>

            <div class="detail-specs">
                <p><strong>Жанр:</strong> ${track.genre}</p>
                <p><strong>Год:</strong> ${track.year}</p>
                <p><strong>Альбом:</strong> ${track.album}</p>
                <p><strong>Длительность:</strong> ${track.duration}</p>
            </div>
        </div>
    `;

    detailSection.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
    detailSection.classList.add('hidden');
});

detailSection.addEventListener('click', event => {
    if (event.target === detailSection) {
        detailSection.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', loadMusic);
