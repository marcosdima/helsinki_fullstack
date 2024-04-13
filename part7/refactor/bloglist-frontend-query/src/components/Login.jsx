import { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = () => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const setUser = useUser()
  const setNotification = useNotification()

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password
    })

    setPassword('')
    setUsername('')
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const userLogin = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(userLogin)
      )

      blogService.setToken(userLogin.token)
      
      setUser(userLogin)
      setNotification('User logged!')
    } catch (exception) {
      console.log('Error at login: ', exception)
      setNotification('Wrong credentials', true)
    }
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

export default Login