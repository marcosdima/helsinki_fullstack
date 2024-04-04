import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleSetBlogs = async () => {
      const blogsRequest = await blogService.getAll()
      setBlogs(blogsRequest)
    }
    handleSetBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username, password,
      })

      //blogService.setToken(user.token)
      
      setUser(userLogin)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("Error at login")
    }
  }

  return (
    <div>
      {
        user === null
          ? <Login 
              password={password}
              username={username}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          : <Blogs blogs={blogs} />
      }
    </div>
  )
}

export default App