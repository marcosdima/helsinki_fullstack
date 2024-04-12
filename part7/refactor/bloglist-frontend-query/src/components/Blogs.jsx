import Blog from './Blog'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const Blogs = ({ like, deleteThis, user }) => {
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
          like={() => like(blog.id)}
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