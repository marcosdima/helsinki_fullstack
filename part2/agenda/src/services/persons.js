import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(respose => respose.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(respose => respose.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(respose => respose.data)
}

export default { 
  getAll, 
  create, 
  update 
}