import { createSlice } from "@reduxjs/toolkit";

// [!] rtk uses immer under the hood. immer doesn't work with primitives. return the new state instead.
// const slice = createSlice({
//     name: 'notification',
//     initialState: '', // [!] primitive type.
//     reducers: {
//         set(state, action) {
//             state = action.payload // [!] will not trigger a change.
//         },
//         reset(state, action) {
//             state = '' // [!] will not trigger a change.
//         }
//     }
// })

const slice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        set(state, action) {
            return action.payload
        },
        reset(state, action) {
            return ''
        }
    }
})

let currentTimeout = null
export const showTimedNotification = (notification, durationInSeconds) => async (dispatch) => {
    dispatch(set(notification))
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
        dispatch(reset())
    }, durationInSeconds * 1000)
}

export const { set, reset } = slice.actions
export default slice.reducer