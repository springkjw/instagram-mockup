/**
 * explore.js - 탐색 페이지 기능
 * 탐색 그리드 렌더링, 검색 필터링
 * [Step 8] 탐색 페이지
 */

let allExploreData = [];

function renderExploreGrid(items) {
  const gridContainer = document.getElementById('exploreGrid');
  const noResults = document.getElementById('noResults');

  gridContainer.innerHTML = '';

  if (items.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'explore-grid__item';
    if (item.size === 'large') {
      div.classList.add('explore-grid__item--large');
    }
    div.innerHTML = `<img src="${item.image}" alt="${item.alt}" class="explore-grid__image" loading="lazy">`;
    gridContainer.appendChild(div);
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderExploreGrid(allExploreData);
      return;
    }

    const filtered = allExploreData.filter(item =>
      item.alt.toLowerCase().includes(query)
    );
    renderExploreGrid(filtered);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchJSON('data/explore.json');
  if (!data) return;

  allExploreData = data;
  renderExploreGrid(data);
  initSearch();
});
