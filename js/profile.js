/**
 * profile.js - 프로필 페이지 기능
 * 프로필 정보 렌더링, 게시물 그리드 표시
 * [Step 7] 프로필 페이지
 */

/**
 * URL 파라미터에서 유저 ID 가져오기
 * ?user=user1 형태의 쿼리 파라미터를 읽는다
 *
 * TODO: URL에서 유저 ID를 추출하세요
 *  1. new URLSearchParams(window.location.search) 사용
 *  2. params.get('user')로 값 가져오기
 *  3. 없으면 기본값 'user1' 반환
 */
function getUserIdFromURL() {

}

/**
 * 프로필 섹션 렌더링
 * 아바타, 통계, 바이오, 하이라이트를 표시한다
 *
 * TODO: 프로필 렌더링 함수를 구현하세요
 *  1. getElementById로 profileSection, headerUsername 가져오기
 *  2. headerUsername.textContent에 유저네임 설정
 *  3. profileSection.innerHTML로 프로필 구조 설정:
 *     ┌ profile__top (아바타 + 통계)
 *     │  └ profile__stats (게시물/팔로워/팔로잉 - formatNumber 사용)
 *     ├ profile__info (displayName + bio)
 *     ├ profile__actions
 *     │  - isCurrentUser면: "프로필 편집" + "프로필 공유" 버튼
 *     │  - 아니면: "팔로우"(primary) + "메시지" 버튼
 *     └ highlights (하이라이트 배열이 있으면 가로 스크롤 목록)
 */
function renderProfile(user) {

}

/**
 * 게시물 그리드 렌더링
 * 해당 유저의 게시물만 필터링하여 3열 그리드로 표시한다
 *
 * TODO: 게시물 그리드를 구현하세요
 *  1. fetchJSON('data/posts.json')으로 데이터 로딩
 *  2. posts.filter()로 해당 유저의 게시물만 추출
 *  3. 게시물이 없으면 "아직 게시물이 없습니다" 메시지 표시
 *  4. forEach로 각 게시물을 그리드에 추가:
 *     - div.post-grid__item 생성
 *     - img.post-grid__image (loading="lazy")
 */
async function renderPostGrid(userId) {

}

/**
 * 페이지 초기화
 *
 * TODO: DOMContentLoaded에서 아래를 실행하세요
 *  1. getUserIdFromURL()로 유저 ID 가져오기
 *  2. fetchJSON('data/users.json')으로 유저 목록 로딩
 *  3. users.find()로 해당 유저 찾기
 *  4. renderProfile(user) 호출
 *  5. renderPostGrid(userId) 호출
 */

