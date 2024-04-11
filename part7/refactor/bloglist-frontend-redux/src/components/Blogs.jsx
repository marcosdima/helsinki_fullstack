import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Blogs = ({ like, deleteThis, user }) => {
  const blogs = useSelector(state => state.blogs)
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