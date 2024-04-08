import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') return anecdotes
        else return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        const { content } = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(setNotificationMessage(`You voted '${content}'`))
        setTimeout(() => dispatch(reset()), 5000)
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
             )}
        </>
    )
}

export default AnecdoteList