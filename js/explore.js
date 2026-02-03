/**
 * explore.js - 탐색 페이지 기능
 * 탐색 그리드 렌더링, 검색 필터링
 * [Step 8] 탐색 페이지
 */

/** 전체 탐색 데이터를 저장해두는 변수 (필터링에 사용) */
let allExploreData = [];

/**
 * 탐색 그리드 렌더링
 * 대형/소형 아이템을 혼합한 인스타그램 스타일 그리드 생성
 *
 * TODO: 탐색 그리드 렌더링 함수를 구현하세요
 *  1. getElementById로 exploreGrid, noResults 가져오기
 *  2. gridContainer.innerHTML = '' 로 기존 내용 초기화
 *  3. items 배열이 비어있으면 noResults 표시
 *  4. forEach로 각 아이템을 그리드에 추가:
 *     - div.explore-grid__item 생성
 *     - size === 'large'면 'explore-grid__item--large' 클래스 추가
 *     - img.explore-grid__image (alt 텍스트, loading="lazy")
 */
function renderExploreGrid(items) {

}

/**
 * 검색 기능 초기화
 * input 이벤트를 이용한 실시간 필터링
 *
 * TODO: 검색 필터 기능을 구현하세요
 *  1. getElementById('searchInput')으로 검색 입력창 가져오기
 *  2. 'input' 이벤트 리스너 등록
 *  3. 검색어가 비어있으면 전체 데이터(allExploreData) 표시
 *  4. allExploreData.filter()로 alt 텍스트에 검색어가 포함된 아이템 추출
 *     힌트: .toLowerCase().includes(query)
 *  5. renderExploreGrid(filtered)로 결과 표시
 */
function initSearch() {

}

/**
 * 페이지 초기화
 *
 * TODO: DOMContentLoaded에서 아래를 실행하세요
 *  1. fetchJSON('data/explore.json')으로 데이터 로딩
 *  2. allExploreData에 데이터 저장
 *  3. renderExploreGrid(data) 호출
 *  4. initSearch() 호출
 */

