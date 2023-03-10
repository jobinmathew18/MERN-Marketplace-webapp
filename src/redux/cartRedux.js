import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {                         
        quantity: 0,
        products: [],
        total: 0
    },
    reducers:{
        addProduct: (state,action) =>{
            // console.log(action.payload)
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        }
    }
})

export const {addProduct} = cartSlice.actions
export default cartSlice.reducer