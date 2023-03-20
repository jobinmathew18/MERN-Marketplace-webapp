import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import userReducer from './userRedux'
import productRedux from "./productRedux";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productRedux
    }
})


export default store; 