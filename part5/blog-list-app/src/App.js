import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/togglable'

function App() {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const blogFormToggleRef = useRef()

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
    }, [])

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs(blogs))
    }, [])

    const showNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => setNotification(null), 5000)
    }

    const login = (username, password) => {
        const credentials = {
            username, password
        }
        loginService
            .login(credentials)
            .then(user => {
                window.localStorage.setItem('user', JSON.stringify(user))
                setUser(user)
                showNotification({
                    type: 'success',
                    message: `Logged in as ${user.username}`
                })
            })
            .catch(e => {
                console.log(e)
                showNotification({
                    type: 'error',
                    message: 'Invalid login credentials'
                })
            })
    }

    if (user) {
        blogService.setToken(user.token)
    }

    const logout = () => {
        showNotification({
            type: 'success',
            message: 'Logged out'
        })
        window.localStorage.removeItem('user')
        setUser(null)
    }

    const createBlog = (blog, onSuccess) => {
        blogService
            .create(blog)
            .then(blog => {
                setBlogs(blogs.concat(blog))
                showNotification({
                    type: 'success',
                    message: `Blog created: ${blog.title} by ${blog.author}`
                })
                onSuccess()
                blogFormToggleRef.current.toggleVisible()
            })
    }

    const likeBlog = (blog) => {
        const likedBlog = {
            user: blog.user.id, // as backend put route is still not using auth
            likes: blog.likes + 1, // obv a very no no this is a backend thing
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        blogService
            .put(blog.id, likedBlog)
            .then(updatedBlog => {
                setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
            })
    }

    const deleteBlog = (blogToDelete) => {
        blogService
            .deleteId(blogToDelete.id)
            .then(() => {
                setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
                showNotification({
                    type: 'success',
                    message: `Blog deleted: ${blogToDelete.title} by ${blogToDelete.author}`
                })
            })
    }

    const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)
    const main = !user
        ? <Login onSubmit={login} />
        : (
            <>
                <p>User: {user.username} <button onClick={logout}>Logout</button> </p>
                <Togglable label='Create new blog' ref={blogFormToggleRef}>
                    <CreateBlogForm onSubmit={createBlog} />
                </Togglable>
                <Blogs blogs={blogsSortedByLikes} onLikeBlog={likeBlog} onDeleteBlog={deleteBlog} user={user} />
            </>
        )

    return (
        <div>
            <h1>Blog List App™</h1>
            <Notification notification={notification} />
            {main}
        </div>
    )
}

export default App
