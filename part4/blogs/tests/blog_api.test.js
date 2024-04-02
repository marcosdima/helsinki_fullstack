const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogs = helper.initialBlogs.map(blog => new Blog(blog))
	const blogs_promises = blogs.map(blog => blog.save())
	await Promise.all(blogs_promises)
})

test('lets valid the number of blogs returned...', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

afterAll(() => {
	mongoose.connection.close()
})