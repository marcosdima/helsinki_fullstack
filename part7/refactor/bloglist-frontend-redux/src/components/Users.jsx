import { useSelector, useDispatch } from 'react-redux'

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
                            <td style={padding}>{user.name}</td>
                            <td style={padding}>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users