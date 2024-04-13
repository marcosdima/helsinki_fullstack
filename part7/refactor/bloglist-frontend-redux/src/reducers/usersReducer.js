import { createSlice } from "@reduxjs/toolkit"
import usersService from '../services/users'

const equalBlogs = (blogA, blogB) => 
    blogA.title === blogB.title &&
    blogA.url === blogB.url &&
    blogA.author === blogB.author 


const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload
        },
        createABlog(state, action) {
            const { user, blog } = action.payload
            const userToUpdate = state.find(anUser => anUser.username === user.username)
            const userUpdated = { ...userToUpdate, blogs: userToUpdate.blogs.concat(blog)} 
            return state
                .map(user => 
                    user.id !== userUpdated.id
                    ? user
                    : userUpdated
                )
        },
        removeABlog(state, action) {
            const { user, blog } = action.payload

            const updatedState = state.map(anUser => {
                if (anUser.username === user.username) {
                    const updatedBlogs = anUser.blogs.filter(aBlog => !equalBlogs(blog, aBlog))
                    return { ...anUser, blogs: updatedBlogs } 
                }
                else return anUser
            })

            return updatedState
        },
        addUser(state, action) {
            return state.concat(action.payload)
        },
        reset(state, action) {
            return null
        }
    }
})

export const { reset, addUser, createABlog, removeABlog } = usersSlice.actions
const { setUsers } = usersSlice.actions

export const initialUsers = () => {
    return async (dispatch) => {
        let users = await usersService.getUsers()
        dispatch(setUsers(users))
    }       
}

export default usersSlice.reducer