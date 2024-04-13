import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const users = useSelector(state => state.users)
    
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