import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user)=>{
    // console.log(user)
    dispatch(loginStart());
    try { 
        const res = await publicRequest.post('/auth/login', user)           
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(loginFailure())
    }
} 