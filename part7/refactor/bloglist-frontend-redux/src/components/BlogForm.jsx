import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createABlog } from '../reducers/usersReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormStyle = {
    marginBottom: 20
  }

  const fields = [
    {
      name: 'title',
      variable: title,
      setAtt: setTitle,
      placeholder: 'Enter a title...'
    },
    {
      name: 'author',
      variable: author,
      setAtt: setAuthor,
      placeholder: 'Enter a author...'
    },
    {
      name: 'url',
      variable: url,
      setAtt: setUrl,
      placeholder: 'Enter a url...'
    }
  ]

  const createBlog = (event) => {
    event.preventDefault()
    const blog = { title, author, url }

    try {
      dispatch(addBlog(blog))
      dispatch(createABlog({ user, blog }))
      handleNotificationMessage(`a new blog: ${blog.title} by ${blog.author}`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      handleNotificationMessage('Error at blog creation', true)
    }
  }

  const handleNotificationMessage = (message, isAnError=false) => 
    dispatch(setNotification(message, isAnError, 3))

  return (
    <div style={blogFormStyle}>
      <form onSubmit={createBlog}>
        <h2>create new</h2>
        {
          fields.map(field =>
            <div key={field.name}>
              {field.name}: <input
                value={field.variable}
                id={field.name}
                placeholder={field.placeholder}
                onChange={({ target }) => field.setAtt(target.value)}
              />
            </div>
          )
        }
        <button type="submit" id='createButton'>create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm