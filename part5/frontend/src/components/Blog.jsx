import { useState } from 'react'

const Blog = ({ blog,user, updateBlogLikes, handleDelete }) => {
 
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikes = () => {
    blog.likes += 1
    updateBlogLikes(blog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remvoe blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog)
    }
  }
  
  if(showDetails === false)
        
  {
      
    return (
      <div  className='blog' style={blogStyle}>
        <div className='blog_default' >
          <div>
            {blog.title} {blog.author}

            <button onClick={toggleDetails}>show</button>
          </div>
        </div>
      </div>
        )
  }
  else
  {
    return (
      <div  className='blog' style={blogStyle}>
        <div className='blog_expanded'>
          <div>
          {blog.title}
            <button onClick={toggleDetails}>hide</button>
            <br></br>
            {blog.url}
            <br></br>
            <div data-testid='like-testid'>
            {blog.likes}
            </div>
            <button onClick={handleLikes}>like</button>
            <br></br>
            {blog.author}
            <br></br>
            {(user?.id === blog.user.id)  ? <button onClick={handleRemove}>remove</button>:<></>}
          </div>
        </div>
      </div>
    )
  }



  }

export default Blog