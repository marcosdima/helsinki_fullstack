import Blog from './Blog'

const Blogs = ({ blogs, like }) => {
    return (
        <>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} like={() => like(blog.id)} />
            )}
        </>
    )
}

export default Blogs