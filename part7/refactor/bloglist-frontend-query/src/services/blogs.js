import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }
const config = () => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create =  async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async blog => {
  const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
  return data
}

const remove = async blogId => {
  const { data } = await axios.delete(`${baseUrl}/${blogId}`, config())
  return data
}

export default { getAll, setToken, create, update, remove }