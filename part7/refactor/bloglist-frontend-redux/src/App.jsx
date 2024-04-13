import { useEffect, useRef } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { reset } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON))
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const logOut = () => dispatch(reset())

  const padding = { padding: 5 }
  const margin = { margin: 10 }

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

  return (
    <Router>
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
        <Route path='/login' element={<Login />} />
        <Route path="/users" element={user ? <div /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  )
}

App.displayName = 'App'

export default App