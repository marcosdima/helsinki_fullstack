import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // Create blog...
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // Notification...
  const [notification, setNotification] = useState(null)
  const [errorFlag, setErrorFlag] = useState(false)

  // Time in miliseconds...
  const notificationTime = 8000

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
  }

  const createBlog = async () => { 
    const blog = { title, author, url }
    try {
      const blogAdded = await blogService.create(blog)
      console.log(blogAdded)
      setBlogs(blogs.concat(blogAdded))
      handleNotificationMessage(`a new blog: ${title} by ${author}`)
    } catch(exception) {
      handleNotificationMessage('Error at blog creation', true)
    }
  }

  const handleLogin = async ({ username, password }) => {
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
      handleNotificationMessage('User logged!')
    } catch (exception) {
      console.log("Error at login")
      handleNotificationMessage('Wrong credentials', true)
    }
  }

  const handleNotificationMessage = (message, isAnError) => {
    if (isAnError) setErrorFlag(true)
    else setErrorFlag(false)

    setNotification(message)
    setTimeout(() => setNotification(null), notificationTime)
  }

  const login = () => <>
    <h2>log in to application</h2>
    <Notification message={notification} isAnError={errorFlag} />
    <Login handleLogin={handleLogin} />
  </>

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
            <Notification message={notification} isAnError={errorFlag}/>
            <p> {user.name} logged in <button onClick={logOut}>logout</button> </p>
            <BlogForm fields={fields} create={createBlog} />
            <Blogs blogs={blogs} />
          </>
      }
    </div>
  )
}

export default App