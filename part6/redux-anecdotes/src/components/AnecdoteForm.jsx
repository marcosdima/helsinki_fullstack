import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, reset } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create = (event) => {
        event.preventDefault()
        const anecdote = event.target.create.value
        dispatch(createAnecdote(anecdote))
        dispatch(setNotificationMessage(`You created ${anecdote}`))
        setTimeout(() => dispatch(reset()), 5000)
    }
  
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='create'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm