import Blog from './Blog'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotification } from '../contexts/NotificationContext'
import { userValue } from '../contexts/UserContext'

const Blogs = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotification()
  const user = userValue()

  // Mutations...
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(
        blog => blog.id !== newBlog.id ? blog : newBlog
      ))
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deleteBlogId) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const blog = blogs.find(blog => blog.id = deleteBlogId)
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== deleteBlogId))
      
    }
  })

  // Handlers...
  const handleLike = (blog) => {
    updateBlogMutation.mutate({ 
      ...blog, 
      likes: blog.likes + 1 ,
      user: blog.user.id
    })
    setNotification(`You liked '${blog.title}'!`)
  }
  const handleDelete = (blog) => {
    deleteBlogMutation.mutate(blog.id)
    setNotification(`You deleted '${blog.title}'!`)
  }

  // Blogs...
  const response = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  if (response.isLoading) 
    return <div>Loading...</div>
  else if (response.isError) 
    return <div>Blogs service not available due to problems in server</div>

  const { data: blogs } = response

  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={() => handleLike(blog)}
          deleteThis={() => handleDelete(blog)}
          ownsThisBlog={user.name === blog.user.name} />
      )}
    </div>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blogs