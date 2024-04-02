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

describe('Blogs composition...', () => {
	test('If no title or no url, go back home...', async() => {
		await api
			.post('/api/blogs')
			.send({})
			.expect(404)
	})
	test('id is "id"... not _id', async () => {
		const { body: blogs } = await api.get('/api/blogs')
		blogs.forEach(element => expect(element.id).toBeDefined())
	}, 100000)
})

describe('Adition...', () => {
	test('lets add a blog...', async () => {
		const blog = {
			author: 'no-exists',
			title: 'Hello world vibes',
			url: 'test.com'
		}
	
		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
	
		const { body: totalBlogs } = await api.get('/api/blogs')
		const titles = totalBlogs.map(blog => blog.title)
	
		expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)
		expect(titles).toContain('Hello world vibes')
	}, 100000)
	test('As everyone knows, when in doubt, zero...', async() => {
		const blog = {
			url: 'test.com',
			title: 'zero likes'
		}
	
		const { body: blogAdded } = await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
	
		expect(blogAdded.likes).toBeDefined()
		expect(blogAdded.likes).toBe(0)
	})
})

describe('Lets valid the whole picture...', () => {
	test('lets valid the number of blogs returned...', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}, 100000)	
})

afterAll(() => {
	mongoose.connection.close()
})