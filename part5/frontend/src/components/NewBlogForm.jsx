const NewBlogForm = ({ blog,setBlog, HandleCreateBlog }) => (
    <div>
        <h2>Create New Blog</h2>
        <form onSubmit={HandleCreateBlog}>
            <div>
            title
                <input
                type="text"
                value={blog.title}
                name="title"
                onChange={({ target }) => setBlog((prevState) => ({...prevState, title: target.value}))}
            />
            </div>
            <div>
            author
                <input
                type="text"
                value={blog.author}
                name="author"
                onChange={({ target }) => setBlog((prevState) => ({...prevState, author: target.value}))}
            />
            </div>
            <div>
            url
                <input
                type="text"
                value={blog.url}
                name="url"
                onChange={({ target }) => setBlog((prevState) => ({...prevState, url: target.value}))}
            />
            </div>
            <button type="submit">create</button>
        </form>

  </div>
)
  
  export default NewBlogForm