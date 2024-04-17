import Books from './components/Books'
import { Routes, Route } from 'react-router-dom'
import { Bar, StyledLink } from './styles'
import Authors from './components/Authors'
import BookForm from './components/BookForm'

function App() {
  
  return (
    <div>
      <Bar>
        <StyledLink to='/'>Books</StyledLink>
        <StyledLink to='/authors'>Authors</StyledLink>
        <StyledLink to='/create'>Add Blog</StyledLink>
      </Bar>
      <Routes>
        <Route path={'/'} element={<Books />}/>
        <Route path={'/authors'} element={<Authors />}/>
        <Route path={'/create'} element={<BookForm />}/>
      </Routes>
    </div>
  )
}

export default App
