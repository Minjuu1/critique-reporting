function init() {
    // 이벤트 리스너 설정
    chrome.runtime.onInstalled.addListener(() => {
        console.log('확장 프로그램이 설치되었습니다.');
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'getData') {
            // 다른 스크립트와 통신하는 기능
            sendResponse({ data: '데이터를 전송합니다.' });
        }
    });
}

// 초기화 함수 호출
init();