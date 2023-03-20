import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        singleProduct: {},
        isFetching: false,
        error: false
    },
    reducers: {
        //GET ALL PRODUCTS
        getProductStart: (state) => { 
            state.isFetching = true
            state.error = false;

        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product = action.payload;
            state.error = false;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false;

        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product.splice(                   //refer splice method from js tut 
                state.product.findIndex(item => item._id === action.payload), 1
            )
            state.error = false;
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        //UPDATE
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false;

        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.singleProduct = {...state.singleProduct, ...action.payload}
            state.error = false;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        //ADD NEW PRODUCT
        addNewProductStart: (state) => {
            state.isFetching = true
            state.error = false;

        },
        addNewProductSuccess: (state, action) => {
            state.isFetching = false;
            //adding new product to product state array.
            state.product.push(action.payload)
            state.error = false;
        },
        addNewProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }

    }
})

export const { getProductStart, getProductSuccess, getProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure, addNewProductStart, addNewProductSuccess,
    addNewProductFailure } = productSlice.actions
export default productSlice.reducer