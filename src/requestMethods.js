import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"

//getting token stored in local storage

let TOKEN = null
if ((JSON.parse(localStorage.getItem("persist:root")))) {
    if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
    }
}

console.log("token is "+TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
}) 