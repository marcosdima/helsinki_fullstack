import Blog from './Blog'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotification } from '../contexts/NotificationContext'
import { userValue } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const Blogs = () => {

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
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blogs