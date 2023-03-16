import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./productRedux";

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


export const getProducts = async (dispatch)=>{
    // console.log(user)
    dispatch(getProductStart());
    try { 
        const res = await publicRequest.get('/products')           
        dispatch(getProductSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getProductFailure())
    }
} 


export const deleteProduct = async (id, dispatch)=>{
    // console.log(user)
    dispatch(deleteProductStart());
    try { 
        await userRequest.delete(`/products/${id}`)           
        dispatch(deleteProductSuccess(id))      //if above delete api request is successfull then dispatch the id to change the current product state.
    } catch (error) {
        console.log(error)
        dispatch(deleteProductFailure())
    }
} 