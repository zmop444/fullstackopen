import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blogsActions } from '../reducers/blogsReducer'
import { notificationThunks } from '../reducers/notificationReducer'
import blogsService from '../services/blogsService'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const BlogCard = ({ blog }) => (
  <Card elevation={3}>
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          {blog.title}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {blog.likes}
          <ThumbUpIcon fontSize="small" sx={{ ml: 1 }} />
        </Typography>
      </Box>
      <Typography variant="subtitle1" component="p">
        by {blog.author}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        variant="text"
        color="secondary"
        component={Link}
        to={`blogs/${blog.id}`}
      >
        View
      </Button>
    </CardActions>
  </Card>
)

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogFormToggleRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const createBlog = (blog, onSuccess) => {
    blogsService
      .create(blog)
      .then((blog) => {
        dispatch(blogsActions.append(blog))
        dispatch(
          notificationThunks.showTimed({
            type: 'success',
            message: `Blog created: ${blog.title} by ${blog.author}`,
          })
        )
        onSuccess()
        blogFormToggleRef.current.toggleVisible()
      })
      .catch((error) => {
        dispatch(
          notificationThunks.showTimed({
            type: 'error',
            message: `Blog creation failed: ${error.response.data.error}`,
          })
        )
      })
  }

  return (
    <>
      <div>
        <Typography variant="h3" component="h2">
          Blogs
        </Typography>
        <Box sx={{ my: 2 }}>
          {user && (
            <Togglable label="Create new blog" ref={blogFormToggleRef}>
              <CreateBlogForm onSubmit={createBlog} />
            </Togglable>
          )}
        </Box>
        <div className="blogs">
          <Grid container spacing={3}>
            {blogsSortedByLikes.map((blog) => (
              <Grid item key={blog.id} xs={12} sm={6} md={4}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Blogs
