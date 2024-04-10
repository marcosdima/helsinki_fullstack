import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
  
  useEffect(() => {
    axios.get(`${baseUrl}/name/${name}`)
      .then( response => {
        setCountry(response)
      })
      .catch(() => console.log("Not found..."))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.data) {
    return (
      <div>
        not found...
      </div>
    )
  }
  const { name: { common: conutryName }, capital, population, flag } = country.data
  const flagStyle = { fontSize: 100 }
  return (
    <div>
      <h3>{conutryName} </h3>
      <div>capital {capital.join(' ')} </div>
      <div>population {population}</div> 
      <div style={flagStyle}>{flag}</div>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App