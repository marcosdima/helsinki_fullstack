import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, reset } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create = async (event) => {
        event.preventDefault()
        const anecdote = await anecdoteService.create(event.target.create.value)
        dispatch(createAnecdote(anecdote))
        dispatch(setNotificationMessage(`You created ${anecdote.content}`))
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