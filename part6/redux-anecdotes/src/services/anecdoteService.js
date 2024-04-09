import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const create = async content => {
    const reseponse = await axios.post(baseUrl, { content, votes: 0 })
    return reseponse.data
}

export default { getAll, create }