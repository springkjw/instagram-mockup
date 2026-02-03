/**
 * feed.js - 피드 페이지 기능
 * 스토리 렌더링, 게시물 렌더링, 좋아요/북마크 토글
 */

async function renderStories() {
  // document.getElementById('stories')
  // → HTML에서 id="stories"인 요소를 찾아 JS 변수에 담음.
  //   이후 이 변수를 통해 해당 요소의 내용을 바꾸거나 이벤트를 등록할 수 있음.
  const container = document.getElementById('stories');
  const stories = await fetchJSON('data/stories.json');
  if (!stories) return;

  // forEach: 배열의 각 요소를 하나씩 꺼내서 함수를 실행.
  //   story => { ... } 는 화살표 함수로, 각 반복마다 story에 배열 요소가 들어옴.
  // 템플릿 리터럴: 백틱(`)으로 감싸면 ${변수}로 문자열 안에 값을 삽입할 수 있음.
  //   예: `안녕 ${name}` → "안녕 홍길동"
  stories.forEach(story => {
    const div = document.createElement('div');
    div.className = `story${story.isOwnStory ? ' story--own' : ''}`;

    const ringHTML = story.hasNewStory
      ? `<div class="story-ring"><div class="story-ring__inner"><img src="${story.avatar}" alt="${story.username}" class="avatar avatar--md"></div></div>`
      : `<img src="${story.avatar}" alt="${story.username}" class="avatar avatar--md">`;

    div.innerHTML = `
      ${ringHTML}
      <span class="story__username">${story.username}</span>
    `;

    container.appendChild(div);
  });
}

async function renderPosts() {
  const container = document.getElementById('feed');
  const posts = await fetchJSON('data/posts.json');
  if (!posts) return;

  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';
    article.dataset.postId = post.id;

    const commentsHTML = post.comments.slice(0, 2).map(c =>
      `<div class="post__comment"><span class="post__comment-username">${c.username}</span>${c.text}</div>`
    ).join('');

    article.innerHTML = `
      <div class="post__header">
        <div class="post__user">
          <div class="story-ring">
            <div class="story-ring__inner">
              <img src="${post.userAvatar}" alt="${post.username}" class="avatar avatar--sm">
            </div>
          </div>
          <div class="post__user-info">
            <span class="post__username">${post.username}</span>
            ${post.location ? `<span class="post__location">${post.location}</span>` : ''}
          </div>
        </div>
        <button class="post__more" aria-label="더보기">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </div>
      <div class="post__image-wrapper">
        <img src="${post.image}" alt="게시물 이미지" class="post__image" loading="lazy">
        <div class="post__heart-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="80" height="80">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      </div>
      <div class="post__actions">
        <div class="post__actions-left">
          <button class="post__action-btn${post.isLiked ? ' post__action-btn--liked' : ''}" data-action="like" aria-label="좋아요">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="post__action-btn" aria-label="댓글">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button class="post__action-btn" aria-label="공유">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <button class="post__action-btn${post.isBookmarked ? ' post__action-btn--bookmarked' : ''}" data-action="bookmark" aria-label="저장">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
      <div class="post__likes">좋아요 <span class="post__likes-count">${formatNumber(post.likes)}</span>개</div>
      <div class="post__caption">
        <span class="post__caption-username">${post.username}</span>${post.caption}
      </div>
      ${post.commentCount > 2 ? `<a href="#" class="post__comments-link">댓글 ${post.commentCount}개 모두 보기</a>` : ''}
      ${commentsHTML}
      <div class="post__timestamp">${getRelativeTime(post.timestamp)}</div>
    `;

    container.appendChild(article);
  });
}

function initPostInteractions() {
  const feedContainer = document.getElementById('feed');
  if (!feedContainer) return;

  // 좋아요 / 북마크 클릭 (이벤트 위임)
  feedContainer.addEventListener('click', (e) => {
    // e.target = 실제 클릭된 요소 (예: SVG 아이콘의 <path>)
    // .closest('[data-action]') = 클릭된 요소부터 위로 올라가며
    //   data-action 속성이 있는 가장 가까운 부모를 찾음.
    //   → 아이콘 내부 어디를 클릭해도 버튼을 정확히 찾을 수 있음 (이벤트 위임)
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const post = actionBtn.closest('.post');

    if (action === 'like') {
      actionBtn.classList.toggle('post__action-btn--liked');
      const likesCount = post.querySelector('.post__likes-count');
      const currentText = likesCount.textContent.replace(/,/g, '').replace('만', '0000');
      let num = parseInt(currentText) || 0;
      num = actionBtn.classList.contains('post__action-btn--liked') ? num + 1 : num - 1;
      likesCount.textContent = formatNumber(num);

      actionBtn.classList.add('like-animation');
      actionBtn.addEventListener('animationend', () => {
        actionBtn.classList.remove('like-animation');
      }, { once: true });
    }

    if (action === 'bookmark') {
      actionBtn.classList.toggle('post__action-btn--bookmarked');
    }
  });

  // 더블탭 좋아요
  feedContainer.addEventListener('dblclick', (e) => {
    const imageWrapper = e.target.closest('.post__image-wrapper');
    if (!imageWrapper) return;

    const post = imageWrapper.closest('.post');
    const likeBtn = post.querySelector('[data-action="like"]');
    const overlay = imageWrapper.querySelector('.post__heart-overlay');

    if (!likeBtn.classList.contains('post__action-btn--liked')) {
      likeBtn.click();
    }

    overlay.classList.remove('post__heart-overlay--active');
    void overlay.offsetWidth;
    overlay.classList.add('post__heart-overlay--active');
  });
}

// DOMContentLoaded: HTML 파싱이 완료되어 DOM 트리가 준비된 시점에 발생하는 이벤트.
// 이미지·폰트 등 외부 리소스 로딩은 기다리지 않고, HTML 구조만 완성되면 바로 실행됨.
// → JS에서 DOM 요소를 안전하게 찾을 수 있는 가장 빠른 타이밍.
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([renderStories(), renderPosts()]);
  initPostInteractions();
});
