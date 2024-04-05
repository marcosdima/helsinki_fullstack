import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, like, deleteThis, ownsThisBlog }) => {
  const [display, setDisplay] = useState('flex')

  const { title, author, url, likes } = blog
  const blogStyle = {
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 'fit-content',
    display
  }
  const deleteStlyle = {
    display: ownsThisBlog ? '' : 'none'
  }
  const handleDisplay = () => {
    setDisplay(
      display === 'flex'
        ? 'grid'
        : 'flex'
    )
  }

  return (
    <span style={blogStyle}>
      { title }
      <Togglable buttonLabel={'view'} onClick={handleDisplay}>
        <div>{ url }</div>
        <div>likes { likes } <button onClick={like}>like</button></div>
        <div>{ author }</div>
        <button onClick={() => deleteThis(blog.id)} style={deleteStlyle}>remove</button>
      </Togglable>
    </span>
  )
}

export default Blog