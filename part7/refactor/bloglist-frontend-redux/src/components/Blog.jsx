import { useSelector, useDispatch } from 'react-redux'
import { removeABlog } from '../reducers/usersReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  if (!blog) return <></>

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const ownsThisBlog = user?.name === blog.user.name

  const { title, author, url, likes } = blog
  const blogStyle = {
    width: 'fit-content'
  }
  const deleteStlyle = {
    display: ownsThisBlog ? '' : 'none'
  }
  
  const handleDelete = (blog) => {
    dispatch(removeBlog(blog))
    dispatch(setNotification(`You deleted '${blog.title}'`, false, 3))
    dispatch(removeABlog({ user, blog }))
  }
  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked '${blog.title}'!`, false, 3))
  }

  return (
    <span style={blogStyle} className='blog'>
      <h1>{title}</h1>
      <div>{ url }</div>
      <div>Likes { likes } <button onClick={() => handleLike(blog)}>like</button></div>
      <div>{ author }</div>
      <button onClick={() => handleDelete(blog)} style={deleteStlyle}>remove</button>
      <h5>Comments</h5>
      <div>{blog?.comments.map(comment => <div>- {comment}</div>)}</div>
    </span>
  )
}

export default Blog