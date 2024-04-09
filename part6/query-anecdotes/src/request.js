import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
    if (newAnecdote.content.lenght < 5)
        return Promise.reject(new Error('El contenido de la anécdota debe tener al menos 5 caracteres.'))
    return axios.post(baseUrl, newAnecdote).then(res => res.data)
}