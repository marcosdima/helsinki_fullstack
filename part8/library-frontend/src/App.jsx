import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './services/query'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Bar, StyledLink } from './styles'
import { useState } from 'react'
import Authors from './components/Authors'
import BookForm from './components/BookForm'
import Login from './components/Login'
import Books from './components/Books'
import Recommend from './components/Recommend'

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { data: { bookAdded }} = data
      window.alert(`Added ${bookAdded.title}!`)
      
      updateBooksData(bookAdded)
      updateAuthorsData(bookAdded.author)
    }
  })

  const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)  
  }

  const updateBooksData = (book) => {
    const { allBooks } = client?.readQuery({ query: ALL_BOOKS }) ?? []
    let result

    if (!allBooks || allBooks.length == 0) result = [book]
    else if (!includedIn(allBooks, book)) result = allBooks.concat(book)
    else result = allBooks
                
    client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: result }
    })
  }
  const updateAuthorsData = (author) => {
    const { allAuthors } = client?.readQuery({ query: ALL_AUTHORS }) ?? []
    let result

    if (!allAuthors || allAuthors.length == 0) result = [author]
    else if (!includedIn(allAuthors, author)) result = allAuthors.concat(author)
    else result = allAuthors
                
    client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: result }
    })
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Bar>
        <StyledLink to='/'>Books</StyledLink>
        <StyledLink to='/authors'>Authors</StyledLink>
        <StyledLink to='/create'>Add Blog</StyledLink>
        <StyledLink to='/recommended'>Recommended</StyledLink>
        { !token ? <StyledLink to='/login'>Login</StyledLink> : <button onClick={logout}>logout</button>}
      </Bar>
      <Routes>
        <Route path={'/'} element={<Books />}/>
        <Route path={'/authors'} element={<Authors />}/>
        <Route path={'/create'} element={token ? <BookForm /> : <Navigate replace to="/login" />}/>
        <Route path={'/recommended'} element={token ? <Recommend /> : <Navigate replace to="/login" />}/>
        <Route path={'/login'} element={<Login setToken={setToken} />}/>
      </Routes>
    </div>
  )
}

export default App
