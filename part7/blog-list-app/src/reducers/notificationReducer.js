import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  message: '',
}

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    reset: () => {
      return initialState
    },
  },
})

export const notificationActions = slice.actions
export default slice.reducer

let currentTimeoutId = null
const showTimed = (notification) => (dispatch) => {
  dispatch(notificationActions.set(notification))
  clearTimeout(currentTimeoutId)

  currentTimeoutId = setTimeout(() => {
    dispatch(notificationActions.reset())
  }, 5000)
}

export const notificationThunks = { showTimed }
