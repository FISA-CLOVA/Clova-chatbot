🤖 NCP CLOVA 연동 챗봇 서비스 (Chatbot Project)
이 프로젝트는 네이버 클라우드 플랫폼(NCP)의 CLOVA Chatbot API를 활용하여 사용자와 실시간 대화가 가능한 웹 기반 채팅 서비스입니다.

1. 프로젝트 주요 기능
초기 시작 메시지: 페이지 로드 시 /start 엔드포인트를 통해 클로바 챗봇의 웰컴 메시지를 자동으로 불러옵니다.

실시간 대화: /ask 엔드포인트를 통해 사용자의 질문을 전달하고 챗봇의 답변을 화면에 출력합니다.

사용자 친화적 UI:

자동 스크롤: 새로운 메시지가 도착하면 자동으로 최하단으로 이동합니다.

실시간 시간 표시: now() 함수를 통해 오전/오후 형식의 메시지 시간을 기록합니다.

입력 최적화: 한글 중복 입력 방지 및 엔터 키 전송 기능을 지원합니다.

2. 기술 스택 및 구조
Frontend
Language: Vanilla JavaScript

Style: CSS3 (Flexbox 레이아웃)

Backend
Runtime: Node.js

Framework: Express

Library:

superagent: NCP API 통신

crypto-js: HMAC SHA256 보안 서명 생성

dotenv: 환경 변수 관리

3. 설치 및 실행 방법
1) 필수 환경 변수 설정
프로젝트 루트 디렉토리에 .env 파일을 생성하고 아래 키를 입력합니다. (보안을 위해 .gitignore에 등록되어 있습니다.)

코드 스니펫

SECRET_KEY=여러분의_NCP_SECRET_KEY
INVOKE_URL=여러분의_CLOVA_INVOKE_URL
2) 패키지 설치
Bash

npm install
3) 서버 실행
Bash

node server.js
실행 후 브라우저에서 http://localhost:7777로 접속합니다.

4. 핵심 코드 설명
보안 서명 (HMAC Signature)
NCP 챗봇 API는 보안을 위해 요청 본문을 기반으로 생성된 서명을 헤더에 요구합니다. api.js에서 이를 처리합니다.

JavaScript

function getSignature(requestBodyString) {
    return HmacSHA256(requestBodyString, SECRET_KEY).toString(EncBase64);
}
이벤트 핸들링
사용자가 메시지를 입력하면 화면에 즉시 반영하고, 서버에 비동기적으로 데이터를 요청합니다.

JavaScript

async function ask(timeSpan, newMessage) {
    // ... 페이로드 구성 및 fetch 요청
    const response = await fetch('/ask', { ... });
    const result = await response.json();
    appendBotMessage(result.content[0].data.details);
}
5. 프로젝트 구조
Plaintext

chatbot/
├── public/              # 정적 파일 (HTML, CSS, 클라이언트 JS, 이미지)
│   ├── index.html
│   ├── style.css
│   └── eventHandler.js
├── api.js               # NCP CLOVA API 통신 로직
├── server.js            # Express 서버 설정
├── package.json         # 프로젝트 의존성 관리
└── .env                 # API 키 관리 (Git 업로드 금지)
