# My Chrome Extension

이 프로젝트는 Chrome 브라우저를 위한 간단한 확장 프로그램입니다. 이 확장 프로그램은 사용자 인터페이스와 상호작용하며, 웹 페이지의 DOM을 수정하는 기능을 포함합니다.

## 파일 구조

```
my-chrome-extension
├── src
│   ├── background.js       # 백그라운드 스크립트
│   ├── content.js          # 콘텐츠 스크립트
│   ├── popup
│   │   ├── popup.html      # 팝업 UI
│   │   ├── popup.js        # 팝업 동작
│   │   └── popup.css       # 팝업 스타일
├── manifest.json           # 확장 프로그램 메타데이터
└── README.md               # 프로젝트 문서
```

## 설치 방법

1. 이 저장소를 클론합니다.
2. Chrome 브라우저에서 `chrome://extensions/`로 이동합니다.
3. "압축 해제된 확장 프로그램 로드" 버튼을 클릭하고, `my-chrome-extension` 폴더를 선택합니다.

## 사용 방법

확장 프로그램 아이콘을 클릭하면 팝업이 열리며, 여기서 다양한 기능을 사용할 수 있습니다.

## 기여

기여를 원하신다면, 이 저장소를 포크하고 Pull Request를 제출해 주세요.