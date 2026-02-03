/**
 * common.js - 공통 유틸리티 함수
 * 모든 페이지에서 공유하는 함수들을 모아둔 파일
 * [Step 5] JS 기초 (fetch + DOM)
 */

/**
 * JSON 데이터를 가져오는 유틸 함수
 * @param {string} url - 데이터 파일 경로
 * @returns {Promise<any>} 파싱된 JSON 데이터
 *
 * TODO: async/await로 fetch 함수를 구현하세요
 *  1. fetch(url)로 데이터 요청
 *  2. response.ok가 아니면 에러 throw
 *  3. response.json()으로 파싱하여 return
 *  4. try/catch로 에러 처리 (console.error 출력, null 반환)
 */
async function fetchJSON(url) {

}

/**
 * 타임스탬프를 상대 시간으로 변환 (예: "3시간 전")
 * @param {string} timestamp - ISO 형식 타임스탬프
 * @returns {string} 상대 시간 문자열
 *
 * TODO: 현재 시간과의 차이를 계산하여 상대 시간을 반환하세요
 *  1. new Date()로 현재 시간, new Date(timestamp)로 과거 시간 구하기
 *  2. 차이를 밀리초 → 초 → 분 → 시간 → 일 → 주 로 변환
 *  3. 조건문으로 적절한 단위 선택:
 *     - 60초 미만: "방금 전"
 *     - 60분 미만: "N분 전"
 *     - 24시간 미만: "N시간 전"
 *     - 7일 미만: "N일 전"
 *     - 5주 미만: "N주 전"
 *     - 그 외: toLocaleDateString('ko-KR') 사용
 */
function getRelativeTime(timestamp) {

}

/**
 * 숫자를 읽기 쉬운 형태로 포맷 (예: 1234 → "1,234")
 * @param {number} num - 포맷할 숫자
 * @returns {string} 포맷된 문자열
 *
 * TODO: 숫자 포맷 함수를 구현하세요
 *  1. 10000 이상: "1.2만" 형태로 표시
 *  2. 그 외: toLocaleString('ko-KR')으로 천 단위 구분자 적용
 */
function formatNumber(num) {

}
