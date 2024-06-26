/* eslint-disable no-undef */
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	switch(error.name) {
	case ('CastError'): return response.status(400).send({ error: 'malformatted id' }) 
	case ('ValidationError'): return response.status(400).json({ error: error.message })
	case ('JsonWebTokenError'): return response.status(401).json({ error: error.message })
	case ('TokenExpiredError'): return response.status(401).json({ error: 'token expired' })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer '))
		request.token = authorization.replace('Bearer ', '')
	next()
}

const userExtractor = (request, response, next) => {
	if (request.token) request.user = jwt.verify(request.token, process.env.SECRET)
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}