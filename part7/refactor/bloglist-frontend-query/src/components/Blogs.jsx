import Blog from './Blog'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const Blogs = ({ deleteThis, user }) => {
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()

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

  // Handlers...
  const handleLike = (blog) => {
    updateBlogMutation.mutate({ 
      ...blog, 
      likes: blog.likes + 1 ,
      user: blog.user.id
    })
    notificationDispatcher(`You voted '${blog.title}'`)
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
          deleteThis={() => deleteThis(blog.id)}
          ownsThisBlog={user.name === blog.user.name} />
      )}
    </div>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  like: PropTypes.func.isRequired,
  deleteThis: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blogs