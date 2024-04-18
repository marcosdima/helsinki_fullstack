const Book = require('./schemas/book')
const Author = require('./schemas/author')
const { GraphQLError } = require('graphql');

const findAuthor = async (name='') => {
    const authors = await Author.find({})
    return authors.find(author => author.name === name)
}

const findBook = async (title='') => {
    const books = await Book.find({})
    return books.find(book => book.title === title)
}

const handleError = (error) => {
    if (error.name === 'ValidationError') {
        const message = error.errors?.name ?? error.errors.title 
        throw new GraphQLError(message, {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    }
}

module.exports =  { findAuthor, findBook, handleError }