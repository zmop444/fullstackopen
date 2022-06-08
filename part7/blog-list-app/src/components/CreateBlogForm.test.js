import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('Form calls the event handler with the right details', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
  }

  const formHandler = jest.fn()
  render(<CreateBlogForm onSubmit={formHandler} />)

  const titleField = screen.getByLabelText('Title', { exact: false })
  userEvent.type(titleField, blog.title)
  const authorField = screen.getByLabelText('Author', { exact: false })
  userEvent.type(authorField, blog.author)
  const urlField = screen.getByLabelText('Url', { exact: false })
  userEvent.type(urlField, blog.url)
  const submitButton = screen.getByRole('button')
  userEvent.click(submitButton)

  expect(formHandler.mock.calls[0][0]).toEqual(blog)
})
