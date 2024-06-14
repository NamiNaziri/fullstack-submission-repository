
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id:1 })
    response.json(blogs)
  })
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  
  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "user": user.id
  })
  

  savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

  })


  blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user.id.toString() )
      {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      }
    else
    {
      return response.status(403).json({
        error: 'Access violation'
      })
    }

  })


  blogsRouter.put('/:id',middleware.userExtractor, async(request, response) => {
    const body = request.body
    const user = request.user

    const blog =    { 
      user: user.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }
  
  
  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
  })

  
  module.exports = blogsRouter