import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: ''
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        update(state, action) {
            state.filter = action.payload
        }
    }
})

export const { update } = slice.actions
export default slice.reducer