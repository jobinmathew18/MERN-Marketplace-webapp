import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { addNewProductFailure, addNewProductStart, addNewProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { addProduct, updateItem } from "./cartRedux";

export const login = async (dispatch, user)=>{
    // console.log(user)
    dispatch(loginStart());
    try { 
        const res = await publicRequest.post('/auth/login', user)    
        localStorage.setItem("user", JSON.stringify(res.data))    
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
        //deleting from database 
        // await userRequest.delete(`/products/${id}`)   
        
        //deleting from redux state
        dispatch(deleteProductSuccess(id))      //if above delete api request is successfull then dispatch the id to change the current product state.

    } catch (error) {
        console.log(error)
        dispatch(deleteProductFailure())
    }
} 


export const updateProduct = async (id, product, dispatch)=>{
    dispatch(updateProductStart());
    try { 
        await userRequest.put(`/products/${id}`, product)           
        dispatch(updateProductSuccess(product))
    } catch (error) {
        console.log(error)
        dispatch(updateProductFailure())
    }
} 


export const addNewProduct = async (product, dispatch)=>{
    // console.log(user)
    dispatch(addNewProductStart());
    try { 
        const res = await userRequest.post('/products', product)           
        dispatch(addNewProductSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(addNewProductFailure()) 
    }
} 


export const addToCart = async(cartItem, dispatch)=>{
    // console.log(cartItem)
    const {_id: productId, quantity, color, img, price, title, size} = cartItem
    try {
        const res = await userRequest.put(`/carts`, {productId, quantity, color, img, price, title, size})
        console.log(res.data) 
        dispatch(addProduct({productId, quantity, color, img, price, title, size})) 
    } catch (error) {
        console.log(error)
    }
}


export const updatecart = async(info, dispatch)=>{
    try {
        
        dispatch(updateItem(info))
    } catch (error) {
        console.log(error)
    }
}