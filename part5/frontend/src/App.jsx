import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({message:null, isError: false})
  const [newBlog, setNewBlog] = useState({title:"", author:"", url:""})

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
      setBlogs( blogs )
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
      setNotificationMessage({message:'Wrong credentials', isError: true})
          setTimeout(() => {
            setNotificationMessage({message:null, isError: false})
          }, 5000)

    }
  }
  const handleLogout = async() =>
  {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }

  const HandleCreateBlog = async(event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setNewBlog({title:"", author:"", url:""})
      setNotificationMessage({message:`A new blog "${blog.title}" by "${blog.author}" added`, isError: false})
      setTimeout(() => {
        setNotificationMessage({message:null, isError: false})
      }, 5000)
    } 
    catch (e) {
      //setNewBlog({title:"", author:"", url:""})
      console.log(e)
      setNotificationMessage({message: e.response.data.error, isError: true})
      setTimeout(() => {
        setNotificationMessage({message:null, isError: false})
      }, 5000)

    }
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

    <NewBlogForm blog={newBlog}setBlog={setNewBlog} HandleCreateBlog={HandleCreateBlog} ></NewBlogForm>
    
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
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