import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../services/query'

const Books = () => {
    const result = useQuery(ALL_BOOKS)

    if (result.loading) {
        return (
        <>
            Loading...
        </>
        )
    }
    const { data: { allBooks: books } } = result 
    
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
                                <td>{book.author}</td>
                                <td>{book.published}</td>
                                <td>Genres: {book.genres.join(', ')}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Books