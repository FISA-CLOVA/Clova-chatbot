const chatInput = document.querySelector('.chat-input');
const chatScreen = document.querySelector('.chat');
const submitBtn = document.getElementById('submit');

// 봇 메시지를 화면에 그리는 함수
function appendBotMessage(text) {
    const chatScreen = document.querySelector('.chat');
    const messageRow = document.createElement('div');
    messageRow.className = 'message-row message-row--bot';
    
    messageRow.innerHTML = `
        <img class="avatar">
        <p class="message message--bot">${text}</p>
        <span class="message-time">${now()}</span>
    `;
    
    chatScreen.appendChild(messageRow);
    chatScreen.scrollTop = chatScreen.scrollHeight;
}

//페이지 로드 시 /start 요청
window.addEventListener('DOMContentLoaded', async () => {

    const startPayload = {
        "userId": "user_test_123",
        "timestamp": Date.now(),
        "event": "open" // 시작 시에는 보통 open 이벤트를 보냅니다
    };

    try {
        const response = await fetch('/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(startPayload)
        });

        const result = await response.json();
        
        const welcomeMessage = result.content[0].data.details;
        
        appendBotMessage(welcomeMessage);

    } catch (error) {
        console.error("초기 메시지 로드 실패:", error);
    }
});




// 1. 버튼 클릭 시 전송
submitBtn.onclick = function(event) {
    event.preventDefault();
    sendMessage();
};

// 2. 엔터키 입력 시 전송
chatInput.addEventListener('keydown', function(event) {
    // event.isComposing : 한글 입력 시 마지막 글자의 중복 입력 방지
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
        event.preventDefault(); // 엔터키 줄바꿈 방지
        sendMessage();
    }
});

//기존 말풍선 시간 추가
function setExistingMessagesTime() {
    const existingMessages = document.querySelectorAll('.message');

    existingMessages.forEach(msg => {
        if (msg.parentNode.querySelector('.message-time')) return;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = now(); 

        if (msg.classList.contains('message--user')) {
            const row = document.createElement('div');
            row.className = 'message-row message-row--user';
            
            msg.parentNode.insertBefore(row, msg);
            row.appendChild(timeSpan); 
            row.appendChild(msg);      
        } else {
            msg.parentNode.appendChild(timeSpan);
        }
    });
}
setExistingMessagesTime();

function now() {
    const now = new Date();
    const hour = now.getHours()
    const minutes = now.getMinutes();

    let period = '';
    let displayHour = '';

    if (hour < 12) {
        period = '오전';
        displayHour = hour; // 0시는 12시로 표시할 수도 있음 (선택)
    } else {
        period = '오후';
        displayHour = hour - 12; // 오후 13시는 1시로 변환
        if (displayHour === 0) { // 오후 12시는 그대로 12시
            displayHour = 12;
        }
    }

    if (hour == 0) {
        displayHour = 12;
    }
    if (hour == 12) {
        displayHour = 12;
    }

    return `${period} ${displayHour}:${minutes < 10 ? '0' + minutes : minutes}`

}

// 메시지를 전송하는 공통 함수
function sendMessage() {
    const messageText = chatInput.value.trim();

    if (messageText !== "") {
        // Row 생성
        const messageRow = document.createElement('div');
        messageRow.className = 'message-row message-row--user';

        // 시간 생성
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = now();

        // 말풍선 생성
        const newMessage = document.createElement('div');
        newMessage.className = 'message message--user';
        newMessage.textContent = messageText;

        // 조립 (시간이 왼쪽, 말풍선이 오른쪽)
        messageRow.appendChild(timeSpan);
        messageRow.appendChild(newMessage);

        chatScreen.appendChild(messageRow);
        chatInput.value = "";
        chatScreen.scrollTop = chatScreen.scrollHeight;

        ask(newMessage.textContent);
    }
}
async function ask(newMessage) {
    
    const askPayload = {
        "userId": "user_test_123",
        "timestamp": Date.now(),
        "content": [
            {
                "type": "text",
                "data": {
                    "details": `${newMessage}`
                }
            }
        ],
        "event": "send" // 시작 시에는 보통 open 이벤트를 보냅니다
    };

    try{
        const response = await fetch('/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(askPayload)
        });
        const result = await response.json();
        const responseMessage = result.content[0].data.details;
        appendBotMessage(responseMessage);
    }catch(error) {
        console.error("응답 메시지 로드 실패:", error);
    }
}