const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User
		.find({})
		.populate('blogs', { url: 1, title: 1, author: 1 })
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	const minLength = 3
	if (password.length < minLength)
		return response.status(400).json({ error: `password has to be at least ${minLength} characters length` })

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
  
	const user = new User({
		username,
		name,
		passwordHash,
	})
  
	const savedUser = await user.save()
  
	response.status(201).json(savedUser)
})
  
usersRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	await User.findByIdAndDelete(id)
	response.status(204).end()
})

module.exports = usersRouter