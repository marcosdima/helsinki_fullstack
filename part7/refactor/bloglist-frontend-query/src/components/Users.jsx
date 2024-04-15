import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = () => {
    const response = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getUsers
    })

    if (response.isLoading) 
        return <div>Loading...</div>
    else if (response.isError) 
        return <div>Blogs service not available due to problems in server</div>

    const { data: users } = response

    const padding = { padding: 10 }
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th style={padding}>User</th>
                        <th style={padding}>Blogs Created</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={padding}>
                                <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td style={padding}>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users