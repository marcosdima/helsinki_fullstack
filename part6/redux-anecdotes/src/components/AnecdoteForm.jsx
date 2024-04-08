import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const create = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.create.value))
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