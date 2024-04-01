/* eslint-disable no-unused-vars */
const { countBy, last, toPairs } = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
	const reducer = (sum, item) => sum + item.likes

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) return
	const { title, author, likes } = blogs.reduce(
		(favorite, current) => favorite.likes > current.likes ? favorite : current,
		blogs[0]
	)

	return { title, author, likes }
}

const mostBlogs = (blogs_input) => {
	const bloggers = countBy(blogs_input, 'author')
	const [author, blogs] = last(toPairs(bloggers))
	return {
		author,
		blogs
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}