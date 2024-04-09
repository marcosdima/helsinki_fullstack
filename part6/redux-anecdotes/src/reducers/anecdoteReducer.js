import { createSlice } from "@reduxjs/toolkit"

const asc = (a, b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
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

export const { setAnecdotes, reset, createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer