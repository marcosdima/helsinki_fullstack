import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { BOOKS_FILTER, GENRES } from '../services/query'
import { useState } from 'react'

const Books = () => {
    const [filters, setFilters] = useState([])
    const [books, setBooks] = useState([])
    const resultGenres = useQuery(GENRES)
    const result = useQuery(BOOKS_FILTER, {
        variables: { genres: filters}
    })

    useEffect(() => {
        if (result.data) setBooks(result.data.allBooks)
    }, [filters, result])

    if (resultGenres.loading) return <div>FFFF</div>

    const genres = resultGenres.data.genres

    const addGenre = (value) => {
        if (value === 'ALL') setFilters([])
        else if (!filters.includes(value)) setFilters(filters.concat(value))
    }

    return (
        <div>
            <h1>Books</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                        <th>Genres</th>
                    </tr>
                    {
                        books.map(book =>
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                                <td>Genres: {book.genres.join(', ')}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                genres 
                ? [...genres, 'ALL'].map(genre =>
                    <button key={genre} onClick={() => addGenre(genre)}>
                        {genre}
                    </button>
                )
                : null
            }
            <div>[{filters.join(', ')}]</div>
        </div>
    )
}

export default Books