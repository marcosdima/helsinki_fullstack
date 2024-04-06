import { useState } from 'react'

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    create({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

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