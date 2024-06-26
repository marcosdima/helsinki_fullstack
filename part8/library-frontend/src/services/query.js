import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
            born
            id
        }
        published
        genres
        id
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            id
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}  
`

export const ADD_BOOK = gql`
    mutation add_book($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published
            author: $author
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation edit_author($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`

export const GENRES = gql`
    query {
        genres
    }
`

export const BOOKS_FILTER = gql`
    query books_filter($genres:[String!]!) {
        allBooks(genres: $genres) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const FAVORITE_GENRE = gql`
    query favoriteGenre {
        me {
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`