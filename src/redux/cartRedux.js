import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        quantity: 0,
        products: [],
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        },
        existingProduct: (state, action) => {
            state.quantity = action.payload.products.length
            state.products = action.payload.products.map(ele => {
                return { ...state.products, ...ele }
            }
            )

            let test = 0;
            action.payload.products.forEach(ele => {
                test += ele.quantity * ele.price
            })
            state.total = test
        },
        deleteItem: (state, action) => {
            state.products.splice(
                state.products.findIndex(item => item.productId === action.payload), 1
            )
            state.quantity -= 1
        },
        updateItem: (state, action) => {
            console.log(action.payload)
            if (action.payload.condition === 'inc') {
                state.products.forEach((item, ind) => {
                    if (item.productId === action.payload.productId) {
                        state.products[ind].quantity += 1
                        state.total += item.price;
                    }
                })
            } else if (action.payload.condition === 'dec') {
                state.products.forEach((item, ind) => {
                    if (item.productId === action.payload.productId && state.products[ind].quantity > 1) {
                        state.products[ind].quantity -= 1
                        state.total -= item.price;
                    }
                })
            }
        }
    }
})



export const { addProduct, existingProduct, deleteItem, updateItem } = cartSlice.actions
export default cartSlice.reducer