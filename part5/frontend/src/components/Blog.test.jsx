import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default.', () => {

  const blog = {
    author: 'amin akbari',
    likes: 15,
    title: 'the art of programming',
    url: 'abc.com',
    user: '22412343214'
  }

  const { container } = render(<Blog blog={blog} />)
  

  let element = container.querySelector('.blog_default')
  expect(element).toHaveTextContent('the art of programming')
  expect(element).toHaveTextContent('amin akbari')
  expect(element).not.toHaveTextContent('abc.com')
  expect(element).not.toHaveTextContent('15')
})


test('the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const blog = {
        author: 'amin akbari',
        likes: 15,
        title: 'the art of programming',
        url: 'abc.com',
        user: '22412343214'
      }

    const { container } = render(<Blog blog={blog} />)
  
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    let element = container.querySelector('.blog_expanded')
    expect(element).toHaveTextContent('the art of programming')
    expect(element).toHaveTextContent('amin akbari')
    expect(element).toHaveTextContent('abc.com')
    expect(element).toHaveTextContent('15')
  })



  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const blog = {
        author: 'amin akbari',
        likes: 15,
        title: 'the art of programming',
        url: 'abc.com',
        user: '22412343214'
      }
    
    const mockHandler = vi.fn()
    render(<Blog blog={blog}  updateBlogLikes={mockHandler}/>)

    const user = userEvent.setup()

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })