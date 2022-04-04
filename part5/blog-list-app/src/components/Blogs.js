import Blog from './Blog'

const Blogs = ({ blogs, onLikeBlog, onDeleteBlog, user }) => {
    return (
        <>
            <h2>Blogs</h2>
            <div className='blogs'>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} onLikeBlog={onLikeBlog} onDeleteBlog={onDeleteBlog} user={user} />)}
            </div>
        </>
    )
}

export default Blogs