import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios
        .get(`${baseUrl}/all`)
        .then(respose => respose.data)
}

export default {
    getAll
}