import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') return anecdotes
        else return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()

    const handleVote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(vote(anecdote))
        dispatch(setNotificationMessage(`You voted '${anecdote.content}'`))
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
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
             )}
        </>
    )
}

export default AnecdoteList