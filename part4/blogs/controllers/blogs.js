const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const blog = await Blog.findById(id)

	response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
	let { userId, ...body } = request.body
	body['user'] = userId
	const blog = new Blog(body)
	
	const user = await User.findById(userId)

	if (!user) 
		return response.status(400).json({ error: 'User no specified...' })

	const savedBlog = await blog.save()
	
	user.notes = user.notes.concat(savedBlog._id) 
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	await Blog.findByIdAndDelete(id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = request.body
	const id = request.params.id

	const blogUpdated = await Blog.findByIdAndUpdate(
		id,
		blog,
		{ new: true, runValidators: true, context: 'query' }
	)

	response.json(blogUpdated)
})

module.exports = blogsRouter