import { useState, useEffect } from 'react'
import Input from './components/Input'
import Notification from './components/Notification'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'
import countriesService from './services/countries'
import weatherService from './services/weather'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {
  const min = 10

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryTarget, setCountryTarget] = useState('')
  const [notification, setNotification] = useState(null)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  // Gets all the countries...
  useEffect(() => { 
      countriesService.getAll().then(data => { setCountries(data)})
    },
    []
  )

  // Set weather...
  useEffect(() => {
      if (!country) return setWeather(null)

      const [lat, lon] = country.latlng
      weatherService
        .getWeather(lat, lon, API_KEY)
        .then(data => {
          const weatherData = {
            country: country.name.common,
            temperature: data.main.temp,
            wind: data.wind.speed,
            icon: weatherService.getIcon(data.weather[0].icon)
          }
          setWeather(weatherData)
        })
    },
    [country]
  )

  const handleSetCountryTarget = (event) => { 
    const target = event.target.value.toLowerCase()
    
    handleFilteredCountries(target)
    setCountryTarget(target)
  }

  const handleShowCountry = (name) => {
    const target = countries.find(element => element.name.common === name)
    setCountry(target)
    setNotification('')
    setFilteredCountries([])
  }

  const handleFilteredCountries = (filter) => {
    let notificatioText = ''
    let countryObj = null

    let filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter)
    )

    if (filtered.length > min) {
      notificatioText = 'Too many matches, specify another filter'
      filtered = []
    } else if (filtered.length === 1) {
      countryObj = filtered[0]
      filtered = []  
    } 

    setFilteredCountries(filtered)
    setNotification(notificatioText)
    setCountry(countryObj)
  } 

  return (
    <>
      <Input value={countryTarget} handler={handleSetCountryTarget} text="find countries" />
      <Notification message={notification} />
      <Countries countries={filteredCountries} show={handleShowCountry}/>
      <Country country={country} />
      <Weather weather={weather}/>
    </>
  )
}

export default App
