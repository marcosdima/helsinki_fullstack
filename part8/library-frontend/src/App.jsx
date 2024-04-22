import { useApolloClient } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'
import { Bar, StyledLink } from './styles'
import { useState } from 'react'
import Authors from './components/Authors'
import BookForm from './components/BookForm'
import Login from './components/Login'
import Books from './components/Books'

function App() {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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
        { !token ? <StyledLink to='/login'>Login</StyledLink> : <button onClick={logout}>logout</button>}
      </Bar>
      <Routes>
        <Route path={'/'} element={<Books />}/>
        <Route path={'/authors'} element={<Authors />}/>
        <Route path={'/create'} element={token ? <BookForm /> : <Login setToken={setToken} />}/>
        <Route path={'/login'} element={<Login setToken={setToken} />}/>
      </Routes>
    </div>
  )
}

export default App
