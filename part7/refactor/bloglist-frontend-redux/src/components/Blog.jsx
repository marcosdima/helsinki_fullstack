import { useSelector, useDispatch } from 'react-redux'
import { removeABlog } from '../reducers/usersReducer'
import { removeBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Title } from '../styles'

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
  const handleComment = event => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(blog, comment))
  }

  return (
    <span style={blogStyle} className='blog'>
      <Title>{title}</Title>
      <div>URL: { url }</div>
      <div>Likes { likes } <Button onClick={() => handleLike(blog)}>like</Button></div>
      <div>Author: { author }</div>
      <Button onClick={() => handleDelete(blog)} style={deleteStlyle}>remove</Button>
      <h5>Comments</h5>
      <form onSubmit={handleComment}>
        Comment: <input name="comment"></input> <Button type='submit'>send</Button>
      </form>
      <div>{blog?.comments.map(comment => <div key={comment}>- {comment}</div>)}</div>
    </span>
  )
}

export default Blog