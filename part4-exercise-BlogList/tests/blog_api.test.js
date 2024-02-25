const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Super easy programming tools",
    author: "Mia Lasa",
    url: "www.searchTech.test",
    likes: 55
  },
  {
    title: "There is something out there",
    author: "Pietr Blachos",
    url: "www.theUnknown.test",
    likes: 307
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('unique identifier property\'s name is id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(element => {
    expect(element.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Ai is waiting",
    author: "Teresa Geoth",
    url: "www.futuristic.de",
    likes: 39
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Ai is waiting'
  )
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const blogToDelete = blogsAtStart.body[1]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  blogsAtEnd = await api.get('/api/blogs')

  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  
  const blogToUpdate = blogsAtStart.body[0]

  const blogPropertyToUpdate =
  {
    likes: 21
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogPropertyToUpdate)
    .expect(201)

  const response = await api.get('/api/blogs')

  const udpatedBlog = response.body[0]

  expect(udpatedBlog.likes).toBe(21)
})

afterAll(async () => {
  await mongoose.connection.close()
})