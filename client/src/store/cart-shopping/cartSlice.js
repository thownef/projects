import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: [],
    totalQuantity: 0,
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // add
        addItem(state, action) {
            state.cartItem = action.payload.products
            state.totalQuantity = action.payload.totalQuantity
            state.totalAmount = action.payload.totalAmount
        },
        resetProduct: (state, action) => {
            state.cartItem = action.payload.products
            state.totalQuantity = action.payload.totalQuantity
            state.totalAmount = action.payload.totalAmount
        },
        //delete
        deleteProduct(state, action) {
            const currentItem = action.payload
            const index = state.cartItem.findIndex(
                (item) => item.id === currentItem.id
            )
            state.totalQuantity--
            if (index !== -1) {
                state.cartItem.splice(index, 1)
            }
            state.totalAmount = state.cartItem.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0)
        },
    },
})

export const { addItem, resetProduct, deleteProduct } = cartSlice.actions
export default cartSlice
