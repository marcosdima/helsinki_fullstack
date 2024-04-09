import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatcher({ type: 'SET_MESSAGE', payload:`You created '${newAnecdote.content}'`})
    },
    onError: (error) => {
      notificationDispatcher({ type: 'SET_MESSAGE', payload: 'Too short anecdote, must have length 5 or more'})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 }) 
    setTimeout(() => notificationDispatcher({ type: 'RESET' }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
