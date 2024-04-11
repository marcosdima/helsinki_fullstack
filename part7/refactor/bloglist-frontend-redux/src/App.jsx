import { useState, useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { initialBlogs, addBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const notification = useSelector(state => state.notification)

  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const createBlog = async blog => {
    try {
      dispatch(addBlog(blog))
      handleNotificationMessage(`a new blog: ${blog.title} by ${blog.author}`)
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      handleNotificationMessage('Error at blog creation', true)
    }
  }

  const likeBlog = async blogId => {
    /*const blog = blogs.find(blog => blog.id === blogId)

    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      const updatedBlog = await blogService.update(likedBlog)

      handleNotificationMessage(`${updatedBlog.title} liked!`)
      setBlogs(blogs.map(blogMapped => blogMapped.id !== blogId ? blogMapped : updatedBlog))
    } catch (exception) {
      handleNotificationMessage(`${blog.title} couldn't be liked... :(`, true)
    }*/
    console.log("Like!")
  }

  const deleteBlog = async blogId => {
    /*
    const blog = blogs.find(blog => blog.id === blogId)
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return

    try {
      await blogService.remove(blogId)
      handleNotificationMessage(`${blog.title} deleted!`)
      setBlogs(blogs.filter(blogMapped => blogMapped.id !== blogId))
    } catch (exception) {
      handleNotificationMessage(`${blog.title} couldn't be deleted... :(`, true)
    }*/
    console.log("Delete!")
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
      console.log('Error at login')
      handleNotificationMessage('Wrong credentials', true)
    }
  }

  const handleNotificationMessage = (message, isAnError=false) => dispatch(setNotification(message, isAnError, 3))

  const login = () => <>
    <h2>log in to application</h2>
    <Notification />
    <Login handleLogin={handleLogin} />
  </>

  return (
    <div>
      {
        user === null
          ? login()
          : <>
            <h2>blogs</h2>
            <Notification />
            <p> {user.name} logged in <button onClick={logOut}>logout</button> </p>
            <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
              <BlogForm create={createBlog} />
            </Togglable>
            <Blogs
              like={likeBlog}
              deleteThis={deleteBlog}
              user={user}
            />
          </>
      }
    </div>
  )
}

App.displayName = 'App'

export default App