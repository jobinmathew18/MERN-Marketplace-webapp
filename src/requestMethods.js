import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDM4M2RlNjM2OTA3NGY3ZmFmY2RmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODIwMDIzMSwiZXhwIjoxNjc4NDU5NDMxfQ.oFxHVl-slSNL1ilWbpuLJRuWS1P4pyA7SgrZhNbZbzU"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: `Bearer ${TOKEN}`}  
})