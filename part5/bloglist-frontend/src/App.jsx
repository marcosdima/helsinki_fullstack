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

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(userLogin)
      ) 

      blogService.setToken(userLogin.token)
      setUser(userLogin)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("Error at login")
    }
  }

  const login = () => <Login 
    password={password}
    username={username}
    handleLogin={handleLogin}
    setUsername={setUsername}
    setPassword={setPassword}
  />

  return (
    <div>
      {
        user === null
          ? login()
          : <>
            <h2>blogs</h2>
            <p> {user.name} logged in <button onClick={logOut}>logout</button> </p>
            <Blogs blogs={blogs} />
          </>
      }
    </div>
  )
}

export default App