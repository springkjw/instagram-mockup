/**
 * profile.js - 프로필 페이지 기능
 * 프로필 정보 렌더링, 게시물 그리드 표시
 * [Step 7] 프로필 페이지
 */

function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('user') || 'user1';
}

function renderProfile(user) {
  const profileSection = document.getElementById('profileSection');
  const headerUsername = document.getElementById('headerUsername');

  headerUsername.textContent = user.username;

  const highlightsHTML = user.highlights.length > 0
    ? `<div class="highlights hide-scrollbar">
        ${user.highlights.map(h =>
          `<div class="highlight">
            <img src="${h.cover}" alt="${h.title}" class="highlight__cover">
            <span class="highlight__title">${h.title}</span>
          </div>`
        ).join('')}
      </div>`
    : '';

  const actionsHTML = user.isCurrentUser
    ? `<div class="profile__actions">
        <button class="profile__btn">프로필 편집</button>
        <button class="profile__btn">보관된 스토리 보기</button>
      </div>`
    : `<div class="profile__actions">
        <button class="profile__btn profile__btn--primary">팔로우</button>
        <button class="profile__btn">메시지</button>
      </div>`;

  profileSection.innerHTML = `
    <div class="profile">
      <div class="profile__top">
        <img src="${user.avatar}" alt="${user.username}" class="avatar avatar--lg">
        <div class="profile__stats">
          <div class="profile__stat">
            <span class="profile__stat-label">게시물</span>
            <span class="profile__stat-number">${formatNumber(user.stats.posts)}</span>
          </div>
          <div class="profile__stat">
            <span class="profile__stat-label">팔로워</span>
            <span class="profile__stat-number">${formatNumber(user.stats.followers)}</span>
          </div>
          <div class="profile__stat">
            <span class="profile__stat-label">팔로잉</span>
            <span class="profile__stat-number">${formatNumber(user.stats.following)}</span>
          </div>
        </div>
      </div>
      <div class="profile__info">
        <div class="profile__display-name">${user.displayName}</div>
        <div class="profile__bio">${user.bio}</div>
      </div>
      ${actionsHTML}
      ${highlightsHTML}
    </div>
  `;
}

async function renderPostGrid(userId) {
  const grid = document.getElementById('postGrid');
  const posts = await fetchJSON('data/posts.json');
  if (!posts) return;

  const userPosts = posts.filter(p => p.userId === userId);

  if (userPosts.length === 0) {
    grid.innerHTML = '<div class="post-grid__empty">아직 게시물이 없습니다.</div>';
    return;
  }

  userPosts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post-grid__item';
    div.innerHTML = `<img src="${post.image}" alt="게시물" class="post-grid__image" loading="lazy">`;
    grid.appendChild(div);
  });
}

function initTabs() {
  const tabs = document.querySelectorAll('.profile-tabs__tab');
  const postGrid = document.getElementById('postGrid');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('profile-tabs__tab--active'));
      tab.classList.add('profile-tabs__tab--active');

      if (index === 0) {
        postGrid.style.display = 'grid';
      } else {
        postGrid.style.display = 'none';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const userId = getUserIdFromURL();
  const users = await fetchJSON('data/users.json');
  if (!users) return;

  const user = users.find(u => u.id === userId);
  if (!user) return;

  renderProfile(user);
  await renderPostGrid(userId);
  initTabs();
});
