import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatcher = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(
        anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ))
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatcher({ type: 'SET_MESSAGE', payload:`You voted '${anecdote.content}'` })
    setTimeout(() => notificationDispatcher({ type: 'RESET' }), 5000)
  }

  const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
  })

  if (result.isLoading) 
    return <div>loading data...</div>
  else if (result.isError) 
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
