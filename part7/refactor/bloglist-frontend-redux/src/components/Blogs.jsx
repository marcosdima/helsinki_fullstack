import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeABlog } from '../reducers/usersReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked '${blog.title}'!`, false, 3))
  }

  const handleDelete = (blog) => {
    dispatch(removeBlog(blog))
    dispatch(setNotification(`You deleted '${blog.title}'`, false, 3))
    dispatch(removeABlog({ user, blog }))
  }

  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={() => handleLike(blog)}
          deleteThis={() => handleDelete(blog)}
          ownsThisBlog={user?.name === blog.user.name} />
      )}
    </div>
  )
}

Blogs.displayName = 'Blogs'

PropTypes.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blogs