import { useEffect, useRef } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

import Login from './components/Login'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { LinkStyled, Body, Bar, Title, Button } from './styles'
import { reset } from './reducers/userReducer'
import { initialUsers } from './reducers/usersReducer'

import {
  Routes, Route,
  Navigate, useMatch
} from 'react-router-dom'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])
  
  useEffect(() => {
    dispatch(initialUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedUserJSON) {
      dispatch(setUser(loggedUserJSON))
      blogService.setToken(loggedUserJSON.token)
    }
  }, [])

  const logOut = () => dispatch(reset())

  queryClient.getQueryData(['blogs'])
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

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
    <Body>
      <Title>Blogs App</Title>

      <Bar>
        <LinkStyled style={padding} to="/" >Blogs</LinkStyled>
        <LinkStyled style={padding} to="/users" >Users</LinkStyled>
        {user
          ? <><em>{user.name} logged in</em> <Button onClick={logOut} style={margin}>logout</Button></>
          : <LinkStyled style={padding} to="/login">login</LinkStyled>
        }
      </Bar>
      
      <Notification />

      <Routes>
        <Route path='/' element={body()} />
        <Route path='/login' element={!user ? <Login /> : body()} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog blog={blog}/>} />
      </Routes>
    </Body>
  )
}

App.displayName = 'App'

export default App