import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from '../services/anecdoteService'

const asc = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload).sort(asc)
    },
    voteAnecdote(state, action) {
      let auxState = state.map(anecdote => 
        anecdote.id !== action.payload 
        ? anecdote 
        : { ...anecdote, votes: anecdote.votes + 1}
      )
      return auxState.sort(asc)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    reset() {
      return []
    }
  }
})

export const { setAnecdotes, reset, voteAnecdote, appendAnecdote } = anecdoteSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer