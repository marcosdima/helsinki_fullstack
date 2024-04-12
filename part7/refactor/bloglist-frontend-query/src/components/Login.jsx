import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      password,
      username
    })

    setPassword('')
    setUsername('')
  }

  return (
    <>
      <form onSubmit={login}>
        <div>
                    username
          <input
            type="text"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
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

PropTypes.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default Login