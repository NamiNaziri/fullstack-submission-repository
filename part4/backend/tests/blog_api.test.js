const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)


  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
      }
  })


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

test('a valid blog can be added ', async () => {
    const newBlog =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      }
  
    await api
      .post('/api/blogs')
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
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(r => r.likes)

    assert.strictEqual(likes[2], 0 )
  })

  test('return 40 bad request if title or url missing', async () => {
    const newBlogMissingTitle =     {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      }
  
    result = await api
      .post('/api/blogs')
      .send(newBlogMissingTitle)
      .expect(400)
      
      const newBlogMissingURL =     {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
      }

      await api
      .post('/api/blogs')
      .send(newBlogMissingURL)
      .expect(400)
  })

after(async () => {
  await mongoose.connection.close()
})