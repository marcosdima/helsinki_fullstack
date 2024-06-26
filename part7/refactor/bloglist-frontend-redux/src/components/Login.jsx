import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(password, username))
    navigate('/')
    setPassword('')
    setUsername('')
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
                    Username:
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    Password:
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='loginButton'>login</button>
      </form>
    </>
  )
}

Login.displayName = 'Login'

export default Login