const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const blogUserId = blog.user.toString() 

  const user = request.user

  const loggedUserId = user.id.toString()

  if (blogUserId === loggedUserId) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'no rights to delete this blog' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogProperty = {
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blogProperty, { new: true })
  response.status(201).json(result)

})

module.exports = blogsRouter