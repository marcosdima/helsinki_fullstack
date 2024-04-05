import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({ blog }) => {
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
      <Togglable buttonLabel={"view"} onClick={handleDisplay}>
        <div>{ url }</div>
        <div>likes { likes } <button>like</button></div>
        <div>{ author }</div>
      </Togglable>
    </span>
  )
}

export default Blog