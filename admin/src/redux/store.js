import { configureStore } from '@reduxjs/toolkit'
import productSlice from './adminSlice/productSlice'
import userSlice from './adminSlice/userSlice'

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        user: userSlice.reducer,
    },
})

export default store
