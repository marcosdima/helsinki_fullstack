const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./schemas/book')
const Author = require('./schemas/author')
const User = require('./schemas/user')
const { findAuthor, findBook, handleError } = require('./utils')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genres: [String]): [Book!]!,
    allAuthors : [Author!]!,
    allUsers: [User!]!,
    genres: [String!]!,
    me: User
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
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }  
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).length,
    authorCount: async () => await Author.find({}).length,
    allBooks: async (root, args) => await findBook({ ...args }),
    allAuthors: async () => await Author.find({}),
    allUsers: async () => await User.find({}),
    genres: async () => {
      const books = await Book.find({})
      const genres = new Set()
      books.forEach(book => book.genres.forEach(genre => genres.add(genre)))
      return Array.from(genres)
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book.populate('author')
    },
    editAuthor: async (root, args, context)  => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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
    },
    createUser: async (root, { username, favoriteGenre}) => {
      const user = new User({ username, favoriteGenre })

      try {
        await user.save()
      } catch(error) {
        handleError(error)
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Suscription: {
    bookAdded: {
      suscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})