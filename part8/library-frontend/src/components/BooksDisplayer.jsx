const BooksDisplayer = ({ books }) => {
    return (
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
    )
}

export default BooksDisplayer