import { useState } from 'react'

const Blog = ({ blog, onLikeBlog, onDeleteBlog, user }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisible = () => {
        setDetailsVisible(!detailsVisible)
    }

    const confirmDeleteBlog = () => {
        if (window.confirm(`Confirm Remove blog: ${blog.title} by ${blog.author}`)) {
            onDeleteBlog(blog)
        }
    }

    const details = !detailsVisible
        ? null
        : (
            <div>
                {blog.url} <br />
                likes: {blog.likes} <button onClick={() => onLikeBlog(blog)}>Like</button> <br />
                {blog.user.username}
                {user.username === blog.user.username
                    ? <button onClick={() => confirmDeleteBlog()}>Delete</button>
                    : null
                }
            </div>
        )

    return (
        <div className='blog' style={blogStyle}>
            {blog.title} {blog.author} <button onClick={toggleVisible}>{detailsVisible ? 'Hide' : 'View'}</button>
            {details}
        </div>
    )
}

export default Blog