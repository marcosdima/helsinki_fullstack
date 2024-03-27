import { useState, useEffect } from 'react'
import Input from './components/Input'
import Notification from './components/Notification'
import Countries from './components/Countries'
import Country from './components/Country'
import countriesService from './services/countries'

function App() {
  const min = 10

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryTarget, setCountryTarget] = useState('')
  const [notification, setNotification] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => { 
      countriesService.getAll().then(data => { setCountries(data)})
    },
    []
  )

  useEffect(() => {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(countryTarget)
      )
      if (filtered.length === 1) {
        setCountry(filtered[0])
        setNotification('')
        setFilteredCountries([])
      } else if (filtered.length >= min) {
        setNotification('Too many matches, specify another filter')
        setFilteredCountries([])
        setCountry(null)
      } else {
        setFilteredCountries(filtered)
        setNotification('')
        setCountry(null)
      }
    }, 
    [countryTarget, countries]
  )

  const handleSetCountryTarget = (event) => { 
    setCountryTarget(event.target.value.toLowerCase())
  }

  return (
    <>
      <Input value={countryTarget} handler={handleSetCountryTarget} text="find countries" />
      <Notification message={notification} />
      <Countries countries={filteredCountries} />
      <Country country={country} />
    </>
  )
}

export default App
