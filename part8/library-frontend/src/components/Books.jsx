import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { ALL_BOOKS, BOOKS_FILTER, GENRES } from '../services/query'
import { useState } from 'react'
import BooksDisplayer from './BooksDisplayer'

const Books = () => {
    const [filters, setFilters] = useState([])
    const [books, setBooks] = useState([])
    const resultGenres = useQuery(GENRES)
    const resultAll = useQuery(ALL_BOOKS)
    const result = useQuery(BOOKS_FILTER, {
        variables: { genres: filters}
    })

    useEffect(() => {
        if (filters?.length > 0 && result.data) setBooks(result.data.allBooks)
        else if (resultAll.data) setBooks(resultAll.data.allBooks)
    }, [filters, result, resultAll])

    if (resultGenres.loading) return <div>FFFF</div>

    const genres = resultGenres.data.genres

    const addGenre = (value) => {
        if (value === 'ALL') setFilters([])
        else if (!filters.includes(value)) setFilters(filters.concat(value))
    }

    return (
        <div>
            <h1>Books</h1>
            <BooksDisplayer books={books}/>
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