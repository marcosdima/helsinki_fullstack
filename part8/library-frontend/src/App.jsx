import Books from './components/Books'
import { Routes, Route } from 'react-router-dom'
import { Bar, StyledLink } from './styles'
import Authors from './components/Authors'

function App() {
  
  return (
    <div>
      <Bar>
        <StyledLink to='/'>Books</StyledLink>
        <StyledLink to='/authors'>Authors</StyledLink>
      </Bar>
      <Routes>
        <Route path={'/'} element={<Books />}/>
        <Route path={'/authors'} element={<Authors />}/>
      </Routes>
    </div>
  )
}

export default App
