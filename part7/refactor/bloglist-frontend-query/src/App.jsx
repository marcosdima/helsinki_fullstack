import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useNotification  } from './contexts/NotificationContext'
import { userValue, useUser } from './contexts/UserContext.jsx'

const App = () => {
  const setUser = useUser()
  const user = userValue()
  const blogFormRef = useRef()
  const setNotification = useNotification()

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

  const handleNotificationMessage = (message, isAnError=false) =>
    setNotification(message, isAnError)

  const login = () => <>
    <h2>log in to application</h2>
    <Notification />
    <Login />
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
              <BlogForm />
            </Togglable>
            <Blogs />
          </>
      }
    </div>
  )
}

App.displayName = 'App'

export default App