/**
 * feed.js - 피드 페이지 기능
 * 스토리 렌더링, 게시물 렌더링, 좋아요/북마크 토글
 * [Step 5~6] JS 기초 + 인터랙션
 */

/**
 * 스토리 바 렌더링
 * stories.json 데이터를 가져와 스토리 아이템을 생성한다
 *
 * TODO: 스토리 렌더링 함수를 구현하세요
 *  1. document.getElementById('stories')로 컨테이너 가져오기
 *  2. fetchJSON('data/stories.json')으로 데이터 로딩
 *  3. forEach로 각 스토리를 DOM에 추가:
 *     - div.story 생성 (isOwnStory면 'story--own' 클래스 추가)
 *     - 새 스토리(hasNewStory)면 그라디언트 링(.story-ring) 적용
 *     - 아바타 이미지 + 유저네임 표시
 *     - appendChild로 컨테이너에 추가
 */
async function renderStories() {

}

/**
 * 게시물 피드 렌더링
 * posts.json 데이터를 가져와 게시물 카드를 생성한다
 *
 * TODO: 게시물 렌더링 함수를 구현하세요
 *  1. document.getElementById('feed')로 컨테이너 가져오기
 *  2. fetchJSON('data/posts.json')으로 데이터 로딩
 *  3. forEach로 각 게시물을 DOM에 추가:
 *     - article.post 생성, dataset.postId 설정
 *     - innerHTML로 게시물 구조 설정:
 *       ┌ post__header (아바타 + 유저네임 + 위치 + 더보기)
 *       ├ post__image-wrapper (이미지 + 하트 오버레이)
 *       ├ post__actions (좋아요/댓글/공유/북마크 버튼)
 *       │  - data-action="like" / data-action="bookmark" 속성
 *       │  - isLiked면 'post__action-btn--liked' 클래스
 *       │  - isBookmarked면 'post__action-btn--bookmarked' 클래스
 *       ├ post__likes (좋아요 수 - formatNumber 사용)
 *       ├ post__caption (유저네임 + 캡션 텍스트)
 *       ├ post__comments-link (댓글 N개 모두 보기)
 *       ├ post__comment (댓글 미리보기 최대 2개)
 *       └ post__timestamp (getRelativeTime 사용)
 */
async function renderPosts() {

}

/**
 * 좋아요/북마크 토글 (이벤트 위임 패턴)
 * 피드 컨테이너에 하나의 이벤트 리스너만 등록하여 성능 최적화
 *
 * TODO: 이벤트 위임으로 좋아요/북마크 기능을 구현하세요
 *  [좋아요 - click 이벤트]
 *  1. feedContainer에 click 이벤트 리스너 등록
 *  2. e.target.closest('[data-action]')로 클릭된 버튼 찾기
 *  3. data-action이 "like"면:
 *     - classList.toggle('post__action-btn--liked')
 *     - 좋아요 수 증감 (post__likes-count 텍스트 변경)
 *     - classList.add('like-animation') + animationend에서 제거
 *  4. data-action이 "bookmark"면:
 *     - classList.toggle('post__action-btn--bookmarked')
 *
 *  [더블탭 좋아요 - dblclick 이벤트]
 *  1. feedContainer에 dblclick 이벤트 리스너 등록
 *  2. e.target.closest('.post__image-wrapper')로 이미지 영역 확인
 *  3. 아직 좋아요 안 눌렸으면 → likeBtn.click() 트리거
 *  4. 하트 오버레이에 'post__heart-overlay--active' 클래스로 애니메이션
 *     힌트: void overlay.offsetWidth 로 reflow 강제 (애니메이션 재시작)
 */
function initPostInteractions() {

}

/**
 * 페이지 초기화
 * DOM이 준비되면 스토리와 게시물을 렌더링한다
 *
 * TODO: DOMContentLoaded 이벤트에서 아래 함수들을 실행하세요
 *  1. renderStories()와 renderPosts()를 Promise.all로 병렬 실행
 *  2. 렌더링 완료 후 initPostInteractions() 호출
 */

