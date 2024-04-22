import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../services/query'
import { useState } from 'react'

const Books = () => {
    const [filters, setFilters] = useState([])
    const result = useQuery(ALL_BOOKS)
    const genres = new Set()

    if (result.loading) {
        return (
        <>
            Loading...
        </>
        )
    }

    const addGenre = (value) => {
        if (value === 'ALL') setFilters([])
        else if (!filters.includes(value)) setFilters(filters.concat(value))
    }
    
    const { data: { allBooks: books } } = result 
    books.forEach(book => {
        genres.add(...book.genres)
    })
    const booksFiltered = books.filter(book => 
        filters.length > 0
        ? filters.every(genre => book.genres.includes(genre))
        : true
    ) 

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
                        booksFiltered.map(book =>
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
                ? [...Array.from(genres), 'ALL'].map(genre =>
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