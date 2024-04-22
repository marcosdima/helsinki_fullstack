import { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'
import { LOGIN } from "../services/query"

const Login = ({ setToken }) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [ login, result ] = useMutation(LOGIN)
  
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const handleLogin = (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    const fields = [
        {
          name: 'username',
          variable: username,
          setAtt: setUsername,
          placeholder: 'Username...'
        },
        {
          name: 'password',
          variable: password,
          setAtt: setPassword,
          placeholder: 'Password...'
        }
    ]

    return (
        <>
        <form onSubmit={handleLogin}>
            <table>
                <tbody>
                    {fields.map(field =>
                    <tr key={field.name}>
                        <td>{field.name}:</td>
                        <td>
                        <input
                            value={field.variable}
                            id={field.name}
                            placeholder={field.placeholder}
                            onChange={({ target }) => field.setAtt(target.value)}
                        />
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <button type="submit" id='createButton'>login</button>
        </form>
      </>
    )
}

export default Login