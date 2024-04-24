import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_BOOK, BOOKS_FILTER, ALL_AUTHORS } from '../services/query'
import Input from "./Input"

const BookForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState('')

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [ { query: BOOKS_FILTER } ],
        update: (cache, response) => {
            cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
                const { name, born, id } = response.data.addBook.author
                const author = { name, born, id }
                const result = 
                    allAuthors.includes(author)
                    ? { allAuthors }
                    : { allAuthors: allAuthors.concat(author) }
                return result
            })
        }
    })

    const handleBookCreation = (event) => {
        event.preventDefault()

        addBook({ variables: { title, author, published: Number(published), genres } })
        setTitle('')
        setAuthor('')
        setPublished('')
        setGenres([])
    }

    const handleaddGenre = () => {
        if (!genres.includes(genre)) setGenres(genres.concat(genre))
        setGenre('')
    }

    const padding = { padding: 10 }

    return (
        <>
            <h1>Book Form</h1>
            <form onSubmit={handleBookCreation}>
                <Input label={'Title'} value={title} setter={setTitle} name="title"/>
                <Input label={'Author'} value={author} setter={setAuthor}/>
                <Input label={'Published'} value={published} setter={setPublished}/>
                <div style={padding}>
                    <div>Genres: [{genres.join(', ')}]</div>
                    <input
                        placeholder="Genres..."
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                        /> 
                    <button type="button" onClick={() => handleaddGenre()}>+</button>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </>
    )
}

export default BookForm