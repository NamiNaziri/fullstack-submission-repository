import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> the form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  
  const { container } = render(<NewBlogForm CreateBlog={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  await user.click(sendButton)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})