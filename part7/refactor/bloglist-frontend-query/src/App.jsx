import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog.jsx'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import User from './components/User.jsx'

import blogService from './services/blogs'
import { userValue, useUser } from './contexts/UserContext.jsx'
import Users from './components/Users.jsx'


import {
  Routes, Route,
  Navigate, Link, useMatch
} from 'react-router-dom'

const App = () => {
  const setUser = useUser()
  const user = userValue()
  const blogFormRef = useRef()
  const match = useMatch('/users/:id')
  const queryClient = useQueryClient()

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

  const body = () => (
    <div>
      <div style={margin}>
        <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
                <BlogForm />
        </Togglable>
      </div>
      <Blogs />
    </div>
  )

  const padding = { padding: 5 }
  const margin = { margin: 10 }

  const users = queryClient.getQueryData(['users'])
  const userTarget = match
    ? users?.find(user => user.id === match.params.id)
    : null

    return (
    <>
      <h1>Blogs App</h1>

      <div>
        <Link style={padding} to="/" >Blogs</Link>
        <Link style={padding} to="/users" >Users</Link>
        {user
          ? <><em>{user.name} logged in</em> <button onClick={logOut} style={margin}>logout</button></>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>
      
      <Notification />

      <Routes>
        <Route path='/' element={body()} />
        <Route path='/login' element={!user ? <Login /> : body()} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={<User user={userTarget} />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </>
  )
}

App.displayName = 'App'

export default App