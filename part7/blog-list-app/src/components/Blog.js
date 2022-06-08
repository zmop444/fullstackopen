import { Divider, Grid, List, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { blogsThunks } from '../reducers/blogsReducer'
import BlogComments from './BlogComments'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return <p>404: Not found</p>
  }

  const onLikeBlog = () => {
    dispatch(blogsThunks.like(blog))
  }

  const onDeleteBlog = (blog) => {
    dispatch(blogsThunks.del(blog))
  }

  const confirmDeleteBlog = () => {
    if (
      window.confirm(`Confirm Remove blog: ${blog.title} by ${blog.author}`)
    ) {
      onDeleteBlog(blog)
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={4}>
        <Typography variant="h3" component="h2">
          {blog.title}
        </Typography>
        <Typography variant="h4" component="h3">
          by {blog.author}
        </Typography>
        <Typography variant="h4" component="a" href={blog.url}>
          {blog.url}
        </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{display: {xs: 'none', sm: 'none', md: 'block'}}} />
      <Grid item sm={7}>
        <BlogComments blog={blog} />
      </Grid>
    </Grid>
  )

  return (
    <div>
      <h2>
        {blog.title}-{blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={onLikeBlog}>like</button>
      </div>
      <p>added by {blog.user.username}</p>
      {user && user.username === blog.user.username && (
        <button onClick={() => confirmDeleteBlog()}>delete</button>
      )}
      <BlogComments blog={blog} />
    </div>
  )
}

export default Blog
