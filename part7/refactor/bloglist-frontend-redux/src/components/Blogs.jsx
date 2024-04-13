import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const [display, setDisplay] = useState('flex')

  const handleDisplay = () => {
    setDisplay(
      display === 'flex'
        ? 'grid'
        : 'flex'
    )
  }

  const blogStyle = {
    display,
    border: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 10
  }
  const titleStyle = { fontWeight: 'bold' }

  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link style={titleStyle} to={`/blogs/${blog.id}`}>{blog.title}</Link>
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