import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const CreateBlogForm = ({ onSubmit }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const clearForm = () =>
    setBlog({
      title: '',
      author: '',
      url: '',
    })

  const onSubmitForm = (event) => {
    event.preventDefault()
    onSubmit(blog, clearForm)
  }

  return (
    <Paper elevation={1} sx={{ p: 3, maxWidth: 'sm' }}>
      <form onSubmit={onSubmitForm}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h2">
            Create new blog listing
          </Typography>
          <TextField
            required
            variant="filled"
            label="Title"
            type="text"
            onChange={(event) =>
              setBlog({ ...blog, title: event.target.value })
            }
            value={blog.title}
          />
          <TextField
            required
            variant="filled"
            label="Author"
            type="text"
            onChange={(event) =>
              setBlog({ ...blog, author: event.target.value })
            }
            value={blog.author}
          />
          <TextField
            required
            variant="filled"
            label="Url"
            type="text"
            onChange={(event) => setBlog({ ...blog, url: event.target.value })}
            value={blog.url}
          />
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            Create
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default CreateBlogForm
