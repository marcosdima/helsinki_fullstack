const Book = require('./schemas/book')
const Author = require('./schemas/author')
const { GraphQLError } = require('graphql');

const findAuthor = async (name='') => {
    const authors = await Author.find({})
    return authors.find(author => author.name === name)
}

const findBook = async ({ author, genres }) => {
    let query = {}
    if (genres && genres.length > 0) query['genres'] = { "$all": genres }
    
    if (author) {
        const existAuthor = await Author.findOne({ name: author })
        query['author'] = existAuthor?._id ?? null
    }

    return await Book.find(query).populate('author')
}

const handleError = (error) => {
    console.log(error)
    if (error.name === 'ValidationError') {
        const message = error.errors?.name ?? error.errors.title 
        throw new GraphQLError(message, {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    } else if (error.name === 'MongoServerError') {
        const message = error
        throw new GraphQLError(message, {
            extensions: { code: 'BAD_USER_INPUT' }
        })
    }
}

module.exports =  { findAuthor, findBook, handleError }