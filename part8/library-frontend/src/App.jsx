import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './services/query'
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
      const { data: { bookAdded: { title } }} = data
      if (title) window.alert(`Added ${title}!`)
    }
  })

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
