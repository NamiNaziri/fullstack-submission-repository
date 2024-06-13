const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')

  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })

    await user.save()

    for (let blog of helper.initialBlogs) {
        blog.user = user._id
        let blogObject = new Blog(blog)
        await blogObject.save()
      }
  })

  describe('when there is initially some blogs saved', () => {
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})




test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test(`the first blog is titled ${helper.initialBlogs[0].title}`, async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)

    assert.strictEqual(contents.includes(helper.initialBlogs[0].title), true)
})


test('blogs have variable id and not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert.ok(blog.id);
        assert.strictEqual(blog._id, undefined)
      });
  })
  

  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      }
 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length )

    const title = blogsAtEnd.map(n => n.title)

    assert(!title.includes('Canonical string reduction'))
  })

test('a valid blog can be added ', async () => {
    const newBlog =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      }
 
    const user = await helper.login(helper.rootUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(n => n.title)

    assert(title.includes('Canonical string reduction'))
  })

  test('blog without likes is set to default value of zero', async () => {
    const newBlog =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      }
      const user = await helper.login(helper.rootUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(r => r.likes)

    assert.strictEqual(likes[2], 0 )
  })

  test('return 400 bad request if title or url missing', async () => {
    const newBlogMissingTitle =     {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      }
      const user = await helper.login(helper.rootUser)
  
    result = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlogMissingTitle)
      .expect(400)
      
      const newBlogMissingURL =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
      }

      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlogMissingURL)
      .expect(400)
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      
      const user = await helper.login(helper.rootUser)
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })


  describe('update of a blog', () => {
    test('Adds 5 to the first blogs likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      let blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes += 5
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const likes = blogsAtEnd.map(r => r.likes)
      assert.strictEqual(likes[0], helper.initialBlogs[0].likes + 5)
    })

    test('update the likes to 15 for the first blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = 15
        
        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .expect(200)
  
        const blogsAtEnd = await helper.blogsInDb()
  
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  
        const likes = blogsAtEnd.map(r => r.likes)
        assert.strictEqual(likes[0], 15)
      })
  })

  after(async () => {
        await mongoose.connection.close()
      })
})

