import axios from 'axios'
const baseUrl = (lat, lon, apiKey) =>
    `https://api.openweathermap.org/data/2.5//weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

const iconURL = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`

const getWeather = (lat, lon, apiKey) => {
    return axios
        .get(baseUrl(lat, lon, apiKey))
        .then(respose => respose.data)
}

const getIcon = (icon) => iconURL(icon)

export default {
    getWeather,
    getIcon
}