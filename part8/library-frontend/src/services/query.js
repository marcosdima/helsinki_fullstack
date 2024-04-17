import { gql } from '@apollo/client'

export const allAuthors = gql`
    query {
        allAuthors {
            name
            id
            born
        }
    }
`

export const allBooks = gql`
    query {
        allBooks {
            title
            author
            published
            genres
            id
        }
    }
`