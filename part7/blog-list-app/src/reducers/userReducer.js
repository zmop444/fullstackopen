import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogsService'
import loginService from '../services/loginService'
import { notificationThunks } from './notificationReducer'

export const LOCALSTORAGE_KEY_USER = 'user'

const slice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    reset: () => {
      return null
    },
  },
})

export const userActions = slice.actions
export default slice.reducer

const login = (username, password) => (dispatch) => {
  loginService
    .login({ username, password })
    .then((user) => {
      dispatch(userActions.set(user))
      dispatch(
        notificationThunks.showTimed({
          type: 'success',
          message: `Logged in as ${user.username}`,
        })
      )
      window.localStorage.setItem(LOCALSTORAGE_KEY_USER, JSON.stringify(user))
    })
    .catch((error) => {
      console.log(error)
      dispatch(
        notificationThunks.showTimed({
          type: 'error',
          message: 'Invalid login credentials',
        })
      )
    })
}

const logout = () => (dispatch) => {
  window.localStorage.removeItem(LOCALSTORAGE_KEY_USER)
  blogsService.setToken(null)
  dispatch(userActions.reset())
  dispatch(
    notificationThunks.showTimed({
      type: 'success',
      message: 'Logged out',
    })
  )
}

export const userThunks = { login, logout }
