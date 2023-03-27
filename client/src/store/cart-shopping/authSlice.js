import { createSlice } from '@reduxjs/toolkit'
import { redirect } from 'react-router-dom'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
            redirect('/')
        },
        loginSuccess(state, action) {
            state.error = false
        },
        loginFail(state, action) {
            state.error = true
        },
        logout(state, action) {
            state.user = null
            localStorage.clear()
        },
        update(state, action) {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(state.user))
        },
    },
})

export const { login, loginFail, logout, update } = authSlice.actions

export default authSlice
