import { configureStore } from '@reduxjs/toolkit'
import authSlice from './cart-shopping/authSlice'
import cartSlice from './cart-shopping/cartSlice'
import searchSlice from './cart-shopping/searchSlice'

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        search: searchSlice.reducer,
        auth: authSlice.reducer,
    },
})

export default store
