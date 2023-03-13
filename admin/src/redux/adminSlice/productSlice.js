import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        getProducts(state, action) {
            state.products = action.payload
        },
    },
})

export const productAction = productSlice.actions
export default productSlice
