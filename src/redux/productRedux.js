import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
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
        }
    }
})

export const { getProductStart, getProductSuccess, getProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure } = productSlice.actions
export default productSlice.reducer