const BlogForm = ({ fields, create }) => {
    const blogFormStyle = {
        marginBottom: 20
    }
    return (
        <div style={blogFormStyle}>
            <h2>create new</h2>
            {
                fields.map(field => 
                    <div key={field.name}>
                        {field.name}: <input
                            value={field.variable}
                            onChange={({ target }) => field.setAtt(target.value)}
                        />
                    </div>     
                )
            }
            <button onClick={create}>create</button>
        </div>
    )
}

export default BlogForm