import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

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
          deleteThis={() => dispatch(removeBlog(blog))}
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