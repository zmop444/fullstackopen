import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
    title: 'test title',
    author: 'test author',
    url: 'testurl.com',
    likes: 69,
    user: {
        username: 'test blog username'
    }
}
const user = {
    username: 'test username'
}

test('blog renders title and author, and not the url and likes.', () => {
    render(<Blog blog={blog} user={user} />)
    screen.getByText(blog.title, { exact: false })
    screen.getByText(blog.author, { exact: false })
    expect(screen.queryByText(blog.url, { exact: false })).toBeNull()
    expect(screen.queryByText(blog.likes, { exact: false })).toBeNull()
})

test('blog renders url and likes when button for viewing is clicked', () => {
    render(<Blog blog={blog} user={user} />)
    // screen.debug()
    const button = screen.getByRole('button')
    userEvent.click(button)
    screen.getByText(blog.url, { exact: false })
    screen.getByText(blog.likes, { exact: false })
})

test('blog like button clicked twice triggers handler twice', () => {
    const likeHandler = jest.fn()
    render(<Blog blog={blog} user={user} onLikeBlog={likeHandler} />)
    const viewButton = screen.getByRole('button')
    userEvent.click(viewButton)
    const likeButton = screen.getByRole('button', { name: /like/i })
    userEvent.click(likeButton)
    userEvent.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
})
