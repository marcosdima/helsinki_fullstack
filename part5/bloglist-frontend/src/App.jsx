import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const createBlog = () => { 
    const blog = { title, author, url }
    blogService.create(blog)
    setBlogs(blogs.concat(blog))
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

  const fields = [
    {
      name: "title",
      variable: title,
      setAtt: setTitle
    },
    {
      name: "author",
      variable: author,
      setAtt: setAuthor
    },
    {
      name: "url",
      variable: url,
      setAtt: setUrl
    }
  ]

  return (
    <div>
      {
        user === null
          ? login()
          : <>
            <h2>blogs</h2>
            <p> {user.name} logged in <button onClick={logOut}>logout</button> </p>
            <BlogForm fields={fields} create={createBlog} />
            <Blogs blogs={blogs} />
          </>
      }
    </div>
  )
}

export default App