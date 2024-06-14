import { useState } from 'react'

const NewBlogForm = ({ CreateBlog }) => {
  const [newBlog, setNewBlog] = useState({ title:'', author:'', url:'' })


  const HandleCreateBlog = async(event) => {
    event.preventDefault()

    CreateBlog(newBlog)
    setNewBlog({ title:'', author:'', url:'' })



  }


  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={HandleCreateBlog}>
        <div>
            title
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, title: target.value }))}
            id='title-input'
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, author: target.value }))}
            id='author-input'
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog((prevState) => ({ ...prevState, url: target.value }))}
            id='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )}

export default NewBlogForm