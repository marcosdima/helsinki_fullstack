import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotification } from '../contexts/NotificationContext'
import blogService from '../services/blogs'
import { userValue } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const setNotification = useNotification()
  const user = userValue()
  const navigate = useNavigate()
  const ownsThisBlog = user?.username === blog.user.username
  

  // Mutations...
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(
        blog => blog.id !== newBlog.id ? blog : newBlog
      ))
      setNotification(`You liked '${newBlog.title}'!`)
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deleteBlogId) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const blog = blogs.find(blog => blog.id === deleteBlogId)
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== deleteBlogId))
    }
  })

  // Handlers...
  const like = (blog) => {
    updateBlogMutation.mutate({ 
      ...blog, 
      likes: blog.likes + 1 ,
      user: blog.user.id
    })
  }
  const deleteThis = (blog) => {
    deleteBlogMutation.mutate(blog.id)
    setNotification(`You deleted '${blog.title}'!`)
    navigate('/')
  }

  const { title, author, url, likes } = blog
  const blogStyle = {
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column'
  }
  const deleteStlyle = {
    display: ownsThisBlog ? '' : 'none'
  }

  return (
    <span style={blogStyle} className='blog'>
        <h1>{ title }</h1>
        <div>{ url }</div>
        <div>likes { likes } <button onClick={() => like(blog)}>like</button></div>
        <div>{ author }</div>
        <button onClick={() => deleteThis(blog)} style={deleteStlyle}>remove</button>
    </span>
  )
}

export default Blog