import { useState } from 'react'

const CreateBlogForm = ({ onSubmit }) => {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const clearForm = () => setBlog({
        title: '',
        author: '',
        url: ''
    })

    const onSubmitForm = (event) => {
        event.preventDefault()
        onSubmit(blog, clearForm)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label>
                        Title:
                        <input type='text' onChange={({ target }) => setBlog({ ...blog, title: target.value })} value={blog.title} />
                    </label>
                </div>
                <div>
                    <label>
                        Author:
                        <input type='text' onChange={({ target }) => setBlog({ ...blog, author: target.value })} value={blog.author} />
                    </label>
                </div>
                <div>
                    <label>
                        Url:
                        <input type='text' onChange={({ target }) => setBlog({ ...blog, url: target.value })} value={blog.url} />
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm