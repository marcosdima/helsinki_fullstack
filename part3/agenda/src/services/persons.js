import axios from 'axios'
const baseUrl = '/api/persons'

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

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update,
  remove
}