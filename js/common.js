/**
 * common.js - 공통 유틸리티 함수
 * 모든 페이지에서 공유하는 함수들을 모아둔 파일
 */

// async/await — 서버에서 데이터를 가져오는 등 "시간이 걸리는 작업"을 다루는 문법.
//
// 일반 함수는 위→아래로 즉시 실행되지만,
// fetch()처럼 네트워크 요청은 응답이 올 때까지 기다려야 함.
//
// async: 이 함수 안에서 await를 쓸 수 있게 해주는 키워드
// await: "이 작업이 끝날 때까지 기다린 뒤 결과를 받아라"는 의미
//        await 없이 쓰면 응답이 오기 전에 다음 줄로 넘어가 버림.
//
// 예시 흐름:
//   const response = await fetch(url);  ← 서버 응답이 올 때까지 대기
//   return await response.json();       ← JSON 파싱이 끝날 때까지 대기
async function fetchJSON(url) {
  // try/catch — 에러가 발생할 수 있는 코드를 안전하게 실행하는 문법.
  //   try 블록 안에서 에러가 나면 catch 블록으로 건너뛰어 에러를 처리.
  //   네트워크 요청처럼 실패 가능성이 있는 작업에 필수.
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
    return null;
  }
}

function getRelativeTime(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  if (diffWeek < 5) return `${diffWeek}주 전`;
  // toLocaleDateString('ko-KR')
  // → 날짜를 한국어 형식의 문자열로 변환 (예: "2025. 1. 15.")
  //   'ko-KR' 대신 'en-US'를 넣으면 "1/15/2025" 처럼 나라별 형식이 바뀜
  return past.toLocaleDateString('ko-KR');
}

function formatNumber(num) {
  if (num >= 10000) {
    // 예: 15234 → 15234/10000 = 1.5234
    //   → .toFixed(1) = "1.5" (소수점 첫째 자리까지 반올림, 문자열 반환)
    //   → .replace(/\.0$/, '') = 딱 떨어지면 ".0" 제거 (예: "2.0" → "2")
    //     ┗ 정규표현식(RegExp): / /로 감싸서 패턴을 만듦
    //       \. = 마침표 문자 (그냥 .은 "아무 글자"라는 특수 의미이므로 \로 이스케이프)
    //       0  = 숫자 0
    //       $  = 문자열의 끝
    //       → 즉 "문자열 끝이 .0이면 찾아서 빈 문자열로 교체(제거)"
    //   → + '만' = "1.5만"
    return (num / 10000).toFixed(1).replace(/\.0$/, '') + '만';
  }
  return num.toLocaleString('ko-KR');
}
