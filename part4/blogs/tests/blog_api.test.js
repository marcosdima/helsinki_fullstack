const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
	await Blog.deleteMany({})
	const blogs = helper.initialBlogs.map(blog => new Blog(blog))
	const blogs_promises = blogs.map(blog => blog.save())
	await Promise.all(blogs_promises)
	
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('sekret', 10)
	const user = new User({ username: 'root', passwordHash })
	await user.save()
}, 100000)

describe('Blogs composition...', () => {
	test('If no title or no url, go back home...', async() => {
		await api
			.post('/api/blogs')
			.send({})
			.expect(400)
	})
	test('id is "id"... not _id', async () => {
		const { body: blogs } = await api.get('/api/blogs')
		blogs.forEach(element => expect(element.id).toBeDefined())
	}, 100000)
})

describe('Blogs Adition...', () => {
	test('lets add a blog...', async () => {
		const blog = {
			author: 'no-exists',
			title: 'Hello world vibes',
			url: 'test.com',
			userId: await helper.rootUser()
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
			title: 'zero likes',
			userId: await helper.rootUser()
		}
	
		const { body: blogAdded } = await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
		console.log(blogAdded)
		expect(blogAdded.likes).toBeDefined()
		expect(blogAdded.likes).toBe(0)
	}, 100000)
})

describe('Blogs Deletion...', () => {
	test('Lets delete...', async() => {
		const title = 'I am gonne be deleted :('
		const blog = {
			url: 'test.com',
			title,
			author: 'me',
			userId: await helper.rootUser()
		}
	
		const { body: blogAdded } = await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)

		await api
			.delete(`/api/blogs/${blogAdded.id}`)

		const { body: blogsAfterDeletion } = await api.get('/api/blogs')
		const titlesAfterDeletion = blogsAfterDeletion.map(blog => blog.title)
	
		expect(titlesAfterDeletion).not.toContain(title)
	}, 100000)
})

describe('Blogs Update...', () => {
	test('A blog recieve a like!', async() => {
		// Get the blogs array first element...
		const { body: [blogTarget] } = await api.get('/api/blogs')
		// Creates a copy of blogTarget with +1 likes...
		const blogModified = {
			...blogTarget,
			likes: blogTarget.likes + 1
		}
		// Updates the blog...
		const { body: blogUpdated } = await api
			.put(`/api/blogs/${blogTarget.id}`)
			.send(blogModified)
			.expect(200)
		
		expect(blogUpdated.likes).toBe(blogTarget.likes + 1)
	}, 10000)
})

describe('When there is initially one user in db', () => {
	test('Creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDB()

		const newUser = {
			username: 'marcosss',
			name: 'Marcos Di Matteo',
			password: 'testpass',
		}
	
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
		const usersAtEnd = await helper.usersInDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
	
		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	}, 100000)

	test('User already taken', async () => {
		const usersAtStart = await helper.usersInDB()
	
		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}
	
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	
		expect(result.body.error).toContain('expected `username` to be unique')
	
		const usersAtEnd = await helper.usersInDB()
		expect(usersAtEnd).toEqual(usersAtStart)
	}, 100000)
})

afterAll(() => {
	mongoose.connection.close()
})