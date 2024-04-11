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
        }
    }
})

const { setBlogs, appendBlog } = blogSlice.actions

export const initialBlogs = () => {
    return dispatch =>
        blogsService.getAll().then(response => dispatch(setBlogs(response)))
}

export const addBlog = blog => {
    return dispatch =>
        blogsService.create(blog).then(respose => dispatch(appendBlog(respose)))
} 

export default blogSlice.reducer