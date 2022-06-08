import { useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogsService from './services/blogsService'
import { useDispatch, useSelector } from 'react-redux'
import { blogsThunks } from './reducers/blogsReducer'
import { userActions } from './reducers/userReducer'
import Users from './components/Users'
import { Route, Routes } from 'react-router-dom'
import User from './components/User'
import Navigation from './components/Navigation'
import { Container } from '@mui/material'

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      dispatch(userActions.set(user))
    }
  }, [])

  useEffect(() => {
    dispatch(blogsThunks.initialize())
  }, [])

  if (user) {
    blogsService.setToken(user.token)
  }

  return (
    <div>
      <Navigation />
      <Container sx={{ pt: 3 }}>
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
