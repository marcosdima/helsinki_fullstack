const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose')

const Book = require('./schemas/book')
const Author = require('./schemas/author')
const { findAuthor, findBook, handleError } = require('./utils')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int,
    id: ID!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors : [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => await Book.find({}).populate("author")
      /*
      books.filter(book =>
        (!args.author || book.author === args.author) &&
        (!args.genre || book.genres.includes(args.genre))
      )*/
    ,
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      // If author does not exist, then creates it...
      let author = await findAuthor(args.author)

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch(error) {
          handleError(error)
        }
      }

      const book = new Book({ ...args, author: author._id })
      
      try {
        await book.save()
      } catch(error) {
        handleError(error)
      }

      return book.populate('author')
    },
    editAuthor: async (root, args)  => {
      const author = await findAuthor(args.name)

      if (!author) throw new GraphQLError('User does not exist...', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
        }
      })
      
      author.born = args.setBornTo

      await author.save()

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})