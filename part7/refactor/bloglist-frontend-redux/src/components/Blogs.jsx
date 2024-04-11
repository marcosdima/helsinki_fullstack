import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blogs = ({ deleteThis, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={() => dispatch(likeBlog(blog))}
          deleteThis={() => deleteThis(blog.id)}
          ownsThisBlog={user.name === blog.user.name} />
      )}
    </div>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  deleteThis: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blogs