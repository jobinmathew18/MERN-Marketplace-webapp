import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"




//getting token stored in local storage
// let TOKEN = null

// if ((JSON.parse(localStorage.getItem("user")))) {
//     TOKEN = JSON.parse(localStorage.getItem("user")).accessToken
    // window.location.reload()
// }

// TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDMyMGEwNmViZTFiZDZmZGYxMDU1OSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzk0MTc0OTYsImV4cCI6MTY3OTY3NjY5Nn0.EOO7kTFlP3OPPAlhW2Kf53klnEse2BCMYCezY0SDfAU"

// console.log("token in requestMethod is: " + TOKEN)

export const userRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: { token: `Bearer ${TOKEN}` }    
// }) 