import { useQuery } from "@apollo/client"
import { BOOKS_FILTER } from "../services/query"
import BooksDisplayer from "./BooksDisplayer"
import { useState, useEffect } from "react"
import { FAVORITE_GENRE } from "../services/query"

const Recommend = () => {
    const [books, setBooks] = useState([])
    const { loading, error, data } = useQuery(FAVORITE_GENRE)
    
    const favoriteGenre = data?.me.favoriteGenre

    const result = useQuery(BOOKS_FILTER, {
        variables: { genres: favoriteGenre ? [favoriteGenre] : []}
    })
    
    useEffect(() => {
        if (result.data)
            setBooks(result.data.allBooks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>Recommendations</h1>
            <p>books in your favorite genre {favoriteGenre}</p>
            <BooksDisplayer books={books}/>
        </>
    )
}

export default Recommend