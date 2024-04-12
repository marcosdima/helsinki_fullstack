import { useState } from 'react'
import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

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
    createBlogMutation.mutate({ title, author, url })
    notificationDispatcher(`You created '${title}'`)
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