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
        }
    }
})

const { setBlogs, appendBlog, updateBlog } = blogSlice.actions

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

export default blogSlice.reducer