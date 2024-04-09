import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

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
        anecdote.id !== action.payload.id
        ? anecdote 
        : action.payload 
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

const { voteAnecdote, appendAnecdote } = anecdoteSlice.actions
export const { setAnecdotes, reset } = anecdoteSlice.actions

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const vote = anecdote => {
  return async dispatch => {
    const anecdoteMod =  { ...anecdote, votes: anecdote.votes + 1}
    const anecdoteVoted = await anecdoteService.update(anecdoteMod)
    dispatch(voteAnecdote(anecdoteVoted))
  }
}

export default anecdoteSlice.reducer