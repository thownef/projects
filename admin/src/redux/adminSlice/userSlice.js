import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getUsers(state, action) {
            state.users = action.payload
        },
    },
})

export const userAction = userSlice.actions
export default userSlice
