import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const blogSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            return [...state, action.payload]
        },
        updateBlog(state, action) {
            return state.map(blog => 
                blog.id !== action.payload.id
                    ? blog
                    : action.payload
            )
        },
        deleteBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        }
    }
})

const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initialBlogs = () => {
    return dispatch =>
        blogsService.getAll().then(response => dispatch(setBlogs(response)))
}

export const addBlog = blog => {
    return dispatch =>
        blogsService.create(blog).then(respose => dispatch(appendBlog(respose)))
}

export const likeBlog = blog => {
    return dispatch => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        blogsService.update(likedBlog).then(update => dispatch(updateBlog(update)))
    }
}

export const commentBlog = (blog, comment) => {
    const commentedBlog = {
        ...blog,
        comments: blog?.comments.concat(comment) ?? [comment],
    }
    console.log(commentedBlog)
    blogsService.update(commentedBlog).then(update => dispatch(updateBlog(update))).catch(error => console.log("AUCH"))
}

export const removeBlog = blog => {
    return dispatch => {
        blogsService.remove(blog.id).then(removed => dispatch(deleteBlog(blog)))
    }
}

export default blogSlice.reducer