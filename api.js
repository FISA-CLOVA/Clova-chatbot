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
        // console.log('payload 보기');
        // console.log(payload);

        const result = await HTTP
            .post(INVOKE_URL)
            .set('Content-Type', 'application/json')
            .set('X-NCP-CHATBOT-SIGNATURE', signature)
            .send(bodyString);

        // console.log('result값 보기');
        console.log(result);
        return result.text;
    }catch(error){
        console.error('Ask Error:', error.response ? error.response.text : error.message);    
    }
}

////////////////    여기까지는 내가 작성하던거    /////////////////////

// import HTTP from 'superagent'
// import dotenv from 'dotenv'

// dotenv.config();

// const SECRET_KEY = process.env.SECRET_KEY;
// const INVOKE_URL = process.env.INVOKE_URL;

// const HmacSHA256 = require('crypto-js/hmac-sha256');
// const EncBase64 = require('crypto-js/enc-base64');
// signatureHeader = HmacSHA256(requestBodyString, SECRET_KEY).toString(EncBase64);


// export async function openWelcomeMessage(payload) {
//     const result = await HTTP
//         .post(INVOKE_URL)
//         .send(payload)
//         .set('X-NCP-CHATBOT_SIGNATURE', signatureHeader)
//         .set('Content-Type', 'application/json')
    
//     const responseDataFromClova = result.body;
    
//     const {
//         //응답 중 필요한 데이터 추출

//     } = responseDataFromClova.message.result;

//     const responseData = {
//         //반환해줄 데이터
//     }

//     return responseData;
// }