import express, { json } from 'express';
import { start, ask } from "./api.js"

const app = express();
const PORT = 7777;

app.use(express.static('public'))
app.use(json());

app.get('/', (_, response) => response.sendFile('index.html'));

app.post('/start', async (request, response) => {

    // 요청 객체에서 페이로드 추출
    const payload = request.body;

    // 외부 API 호출(NCP 언어감지)
    const result = await start(payload);

    // 클라이언트에게 응답 처리
    response.send(result);
});

app.post('/ask', async (request, response) => {
    const payload = request.body;
    const result = await ask(payload);
    response.send(result);
})

app.listen(PORT, () => console.log(`Express 서버가 http://localhost:${PORT} 에서 대기중`));