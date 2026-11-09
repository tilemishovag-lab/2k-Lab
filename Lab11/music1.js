const defaultMusic = [
    { id: 1, name: "Dynamite", artist: "BTS", genre: "K-pop, Disco-pop", year: 2020, image: "music.image/music1.jpg", description: "Яркая и энергичная песня BTS с позитивным настроением и танцевальным звучанием.", album: "BE", duration: "3:19" },
    { id: 2, name: "Standing Next to You", artist: "Jung Kook", genre: "Pop, R&B", year: 2023, image: "music.image/music2.jpg", description: "Динамичная сольная композиция с выразительным вокалом и ретро-звучанием.", album: "GOLDEN", duration: "3:26" },
    { id: 3, name: "Deja Vu", artist: "TOMORROW X TOGETHER", genre: "K-pop, Pop-rock", year: 2024, image: "music.image/music3.jpg", description: "Эмоциональная песня TXT о воспоминаниях, обещаниях и особенной связи.", album: "minisode 3: TOMORROW", duration: "2:51" },
    { id: 4, name: "Magnetic", artist: "ILLIT", genre: "K-pop, Dance-pop", year: 2024, image: "music.image/music4.jpg", description: "Лёгкая танцевальная композиция с запоминающимся припевом.", album: "SUPER REAL ME", duration: "2:40" },
    { id: 5, name: "SOLO", artist: "JENNIE", genre: "K-pop, Pop", year: 2018, image: "music.image/music5.jpg", description: "Сольная композиция с элементами поп-музыки и электронного звучания.", album: "SOLO", duration: "2:49" }
];

const getEl = id => document.getElementById(id);
let musicData = [];

const escapeHtml = str => String(str || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const save = () => localStorage.setItem('musicData', JSON.stringify(musicData));

async function loadMusic() {
    const saved = localStorage.getItem('musicData');
    if (saved) {
        musicData = JSON.parse(saved);
    } else {
        try {
            const res = await fetch('music1.json');
            if (res.ok) {
                musicData = await res.json();
            } else {
                musicData = defaultMusic;
            }
        } catch (e) {
            musicData = defaultMusic;
        }
        save();
    }
    renderMusicList();
}

function renderMusicList() {
    const container = getEl('product-grid');
    if (!container) return;
    
    container.innerHTML = musicData.length ? '' : '<p>Список треков пуст!</p>';

    musicData.forEach(track => {
        const card = document.createElement('div');
        card.className = 'music-card';

        card.innerHTML = `
            <img src="${escapeHtml(track.image)}" alt="${escapeHtml(track.name)}" class="music-img" onerror="this.src='https://via.placeholder.com/200x180?text=${encodeURIComponent(track.artist)}'">
            <div class="music-info">
                <h3>${escapeHtml(track.name)}</h3>
                <p class="music-artist">${escapeHtml(track.artist)}</p>
                <p>Жанр: ${escapeHtml(track.genre)} | Год: ${escapeHtml(track.year)}</p>
            </div>
            <div class="card-actions">
                <button class="btn-edit" data-action="edit" data-id="${track.id}">Изменить</button>
                <button class="btn-delete" data-action="delete" data-id="${track.id}">Удалить</button>
            </div>
        `;

        card.onclick = e => {
            if (!e.target.closest('button')) showMusicDetail(track.id);
        };

        container.appendChild(card);
    });
}

function showMusicDetail(id) {
    const t = musicData.find(item => item.id === id);
    const detailCard = getEl('detail-card');
    const detailSection = getEl('detail-section');
    if (!t || !detailCard || !detailSection) return;

    detailCard.innerHTML = `
        <div class="detail-layout">
            <h2>${escapeHtml(t.name)}</h2>
            <p><strong>Исполнитель:</strong> ${escapeHtml(t.artist)}</p>
            <p>${escapeHtml(t.description || 'Описание отсутствует')}</p>
            <p><strong>Альбом:</strong> ${escapeHtml(t.album)} | <strong>Длительность:</strong> ${escapeHtml(t.duration)}</p>
        </div>
    `;
    detailSection.classList.remove('hidden');
}

const trackForm = getEl('trackForm');
if (trackForm) {
    trackForm.onsubmit = e => {
        e.preventDefault();
        const id = getEl('trackId').value;
        const name = getEl('trackName').value.trim();
        const artist = getEl('trackArtist').value.trim();

        if (!name || !artist) return alert('Заполните название и исполнителя!');

        const trackData = {
            name, 
            artist,
            genre: getEl('trackGenre').value.trim() || 'Разное',
            year: Number(getEl('trackYear').value) || 2024,
            album: getEl('trackAlbum').value.trim() || '—',
            duration: getEl('trackDuration').value.trim() || '—',
            image: getEl('trackImage').value.trim() || 'music.image/music1.jpg',
            description: getEl('trackDescription').value.trim()
        };

        if (id) {
            musicData = musicData.map(t => t.id === Number(id) ? { id: Number(id), ...trackData } : t);
        } else {
            const newId = musicData.length ? Math.max(...musicData.map(t => Number(t.id) || 0)) + 1 : 1;
            musicData.unshift({ id: newId, ...trackData });
        }

        save();
        resetForm();
        renderMusicList();
    };
}

const productGrid = getEl('product-grid');
if (productGrid) {
    productGrid.onclick = e => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const id = Number(btn.dataset.id);
        
        if (btn.dataset.action === 'edit') {
            const t = musicData.find(item => item.id === id);
            if (!t) return;
            getEl('trackId').value = t.id;
            getEl('trackName').value = t.name || '';
            getEl('trackArtist').value = t.artist || '';
            getEl('trackGenre').value = t.genre || '';
            getEl('trackYear').value = t.year || '';
            getEl('trackAlbum').value = t.album || '';
            getEl('trackDuration').value = t.duration || '';
            getEl('trackImage').value = t.image || '';
            getEl('trackDescription').value = t.description || '';

            if (getEl('formTitle')) getEl('formTitle').textContent = 'Редактировать трек';
            if (getEl('submitBtn')) getEl('submitBtn').textContent = 'Сохранить';
            if (getEl('cancelBtn')) getEl('cancelBtn').style.display = 'inline-block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        if (btn.dataset.action === 'delete') {
            if (confirm('Удалить этот трек?')) {
                musicData = musicData.filter(t => t.id !== id);
                save();
                renderMusicList();
            }
        }
    };
}

function resetForm() {
    if (!trackForm) return;
    getEl('trackId').value = '';
    trackForm.reset();
    if (getEl('formTitle')) getEl('formTitle').textContent = 'Добавить новый трек';
    if (getEl('submitBtn')) getEl('submitBtn').textContent = 'Добавить трек';
    if (getEl('cancelBtn')) getEl('cancelBtn').style.display = 'none';
}

if (getEl('cancelBtn')) getEl('cancelBtn').onclick = resetForm;
if (getEl('close-btn')) getEl('close-btn').onclick = () => getEl('detail-section').classList.add('hidden');
if (getEl('detail-section')) getEl('detail-section').onclick = e => e.target === getEl('detail-section') && getEl('detail-section').classList.add('hidden');

document.addEventListener('DOMContentLoaded', loadMusic);
