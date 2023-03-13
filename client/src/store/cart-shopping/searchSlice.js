import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchTerm: '',
    isFetching: false,
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        startSearch(state, action) {
            state.isFetching = true
        },
        search(state, action) {
            state.searchTerm = action.payload
            state.isFetching = false
        },
    },
})

export default searchSlice
export const { search, startSearch } = searchSlice.actions
