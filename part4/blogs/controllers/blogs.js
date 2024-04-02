const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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
	const blog = new Blog(request.body)

	const result = await blog.save()
	response.status(201).json(result)
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