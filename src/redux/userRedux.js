import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user', 
    initialState: {
        currentUser:  null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true
        },
        loginSuccess: (state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;  
        },
        loginFailure: (state)=>{
            state.isFetching = false; 
            state.error = true;  
        },
        logoutSuccess: (state)=>{
            state.currentUser = null;
        }
    }
})


export const {loginStart, loginFailure, loginSuccess, logoutSuccess} = userSlice.actions
export default userSlice.reducer