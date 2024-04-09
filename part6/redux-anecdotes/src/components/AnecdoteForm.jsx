import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, reset } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create = async (event) => {
        event.preventDefault()
        const content = event.target.create.value
        event.target.create.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotificationMessage(`You created ${content}`))
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