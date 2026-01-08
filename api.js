import HTTP from 'superagent'
import dotenv from 'dotenv'
import HmacSHA256 from "crypto-js/hmac-sha256.js";
import EncBase64 from "crypto-js/enc-base64.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const INVOKE_URL = process.env.INVOKE_URL;

function getSignature(requestBodyString) {
    return HmacSHA256(requestBodyString, SECRET_KEY).toString(EncBase64);
}

export async function start(payload) {
    // 클로바 API 요청
    console.log(payload);
    const result = await HTTP
        .post(INVOKE_URL)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('x-ncp-chatbot-signature', getSignature(payload));

    // 클로바 응답 본문
    const responseDataFromClova = result.text;

    return responseDataFromClova;
}

export async function ask(payload){
    try{
        const bodyString = JSON.stringify(payload);
        const signature = getSignature(bodyString);

        const result = await HTTP
            .post(INVOKE_URL)
            .set('Content-Type', 'application/json')
            .set('X-NCP-CHATBOT-SIGNATURE', signature)
            .send(bodyString);

        return result.text;
    }catch(error){
        console.error('Ask Error:', error.response ? error.response.text : error.message);    
    }
}