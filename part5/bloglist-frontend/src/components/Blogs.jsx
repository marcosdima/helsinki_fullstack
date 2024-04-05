import Blog from './Blog'

const Blogs = ({ blogs, like, deleteThis, user }) => {
    return (
        <>
            {blogs.map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog} 
                like={() => like(blog.id)}
                deleteThis={deleteThis}
                ownsThisBlog={user.name === blog.user.name} />
            )}
        </>
    )
}

export default Blogs