import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message:null, isError: false })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
    {
      setBlogs( blogs.sort((a, b) =>  b.likes - a.likes) )


    }
    )
  }, [])


  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotificationMessage({ message:'Wrong credentials', isError: true })
      setTimeout(() => {
        setNotificationMessage({ message:null, isError: false })
      }, 5000)

    }
  }
  const handleLogout = async() =>
  {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  const CreateBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createBlog = await blogService.create(blog)
      console.log(createBlog)
      setBlogs(blogs.concat(createBlog).sort((a, b) =>  b.likes - a.likes))
      setNotificationMessage({ message:`A new blog "${createBlog.title}" by "${createBlog.author}" added`, isError: false })
      setTimeout(() => {
        setNotificationMessage({ message:null, isError: false })
      }, 5000)
    }
    catch (e) {
      console.log(e)
      setNotificationMessage({ message: e.response.data.error, isError: true })
      setTimeout(() => {
        setNotificationMessage({ message:null, isError: false })
      }, 5000)
    }
  }

  const updateBlogLikes = async (blog) => {
    console.log(blog)
    const updateBlog = await blogService.updateLike(blog)
    
    setBlogs(blogs.map(blog => blog.id !== updateBlog.id ? blog : updateBlog).sort((a, b) =>  b.likes - a.likes))
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog)
    setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) =>  b.likes - a.likes))
  }

  const loginForm =  () => (
    <>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}>
      </Login>
    </>)

  const blogsView =  () => (
    <>
      <h2>blogs</h2>

      <p>{`${user.name} logged in`}</p>
      <button onClick={handleLogout}> Logout </button>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm CreateBlog={CreateBlog} ></NewBlogForm>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlogLikes={updateBlogLikes} handleDelete={deleteBlog}/>
      )}
    </>)


  return (
    <div>
      <Notification notification={notificationMessage}  />

      {user === null && loginForm()}
      {user !== null && blogsView()}

    </div>
  )

}

export default App