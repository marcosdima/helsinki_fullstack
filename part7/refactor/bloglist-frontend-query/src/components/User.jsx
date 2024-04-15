import { useNavigate } from "react-router-dom"

const User = ({ user }) => {
    const navigate = useNavigate()
    if (!user) return navigate('/')

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