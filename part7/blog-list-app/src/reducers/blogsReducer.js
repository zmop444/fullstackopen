import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogsService'
import { notificationThunks } from './notificationReducer'

const initialState = []

const slice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    append: (state, action) => {
      state.push(action.payload)
    },
    update: (state, action) => {
      const updatedBlog = action.payload
      const indexToUpdate = state.findIndex(
        (blog) => blog.id === updatedBlog.id
      )
      state[indexToUpdate] = updatedBlog
    },
    remove: (state, action) => {
      const idToRemove = action.payload
      return state.filter((blog) => blog.id !== idToRemove)
    },
    appendComment: (state, action) => {
      const {id, comment} = action.payload
      const blog = state.find(blog => blog.id === id)
      // if(!blog.comments) {
      //   blog.comments = []
      // }
      blog.comments.push(comment)
    }
  },
})

export const blogsActions = slice.actions
export default slice.reducer

const initialize = () => (dispatch) => {
  blogsService
    .getAll()
    .then((blogs) => {
      dispatch(blogsActions.set(blogs))
    })
    .catch((error) =>
      console.log('blogservice failed to retrieve blogs', error)
    )
}

const like = (blog) => (dispatch) => {
  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1, // obv a very no no this is a backend thing
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }
  blogsService
    .put(blog.id, likedBlog)
    .then((updatedBlog) => {
      dispatch(blogsActions.update(updatedBlog))
      dispatch(
        notificationThunks.showTimed({
          type: 'success',
          message: `liked ${blog.title}`,
        })
      )
    })
    .catch((error) => console.log('failed to like blog', error))
}

const del = (blog) => (dispatch) => {
  blogsService.deleteId(blog.id).then(() => {
    dispatch(blogsActions.remove(blog.id))
    dispatch(
      notificationThunks.showTimed({
        type: 'success',
        message: `Blog deleted: ${blog.title} by ${blog.author}`,
      })
    )
  })
}

export const blogsThunks = { initialize, like, del }
