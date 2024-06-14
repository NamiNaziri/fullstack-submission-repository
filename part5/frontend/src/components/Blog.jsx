import { useState } from 'react'

const Blog = ({ blog,user, updateBlogLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikes = () => {
    console.log(blog)
    blog.likes += 1
    updateBlogLikes(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remvoe blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog)
    }
  }

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title}

          <button onClick={toggleDetails}>show</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={toggleDetails}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
          <br></br>
          {blog.author}
          <br></br>
          {user.id === blog.user ? <button onClick={handleRemove}>remove</button>:<></>}


        </div>
      </div>
    </div>


  )}

export default Blog