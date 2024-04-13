import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(user => user.id === id)

    if (!user) return null

    return (
        <div>
            <h1>{user.username}</h1>
            <h2>Blogs Added</h2>
            <div>
                {user.blogs.map(blog => <p key={blog.id}>·{blog.title}</p>)}
            </div>
        </div>
    )
}

export default User