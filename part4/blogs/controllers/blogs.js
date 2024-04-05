/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const blog = await Blog.findById(id)

	response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
	if (!request.user) return response.status(401).json({ error: 'token invalid' })

	let { body } = request
	body['user'] = request.user.id
	const blog = new Blog(body)

	const user = await User.findById(request.user.id)

	if (!user) 
		return response.status(400).json({ error: 'User no specified...' })

	const savedBlog = await blog.save()
	
	user.blogs = user.blogs.concat(savedBlog._id) 
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	
	if (!request.user) return response.status(401).json({ error: 'token invalid' })

	const blog = await Blog.findById(id)
	if (!blog) return response.status(404).json({ error: 'blog does not exist' })

	const user = await User.findById(request.user.id)

	if (blog.user.toString() !== user.id) return response.status(401).json({ error: `this blog doesn't belong to ${user.name}` })

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
	).populate('user')

	response.json(blogUpdated)
})

module.exports = blogsRouter