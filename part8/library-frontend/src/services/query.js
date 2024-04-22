import { gql } from '@apollo/client'

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
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`

export const ADD_BOOK = gql`
    mutation add_book($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author {
                name
            }
            genres
            id
        }
    }
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
            title
            author {
                name
            }
            published
            genres
            id
        }
    }
`