import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, like, deleteThis, user }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog.id)}
          deleteThis={() => deleteThis(blog.id)}
          ownsThisBlog={user.name === blog.user.name} />
      )}
    </>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  blogs: PropTypes.array.isRequired,
  like: PropTypes.func.isRequired,
  deleteThis: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blogs