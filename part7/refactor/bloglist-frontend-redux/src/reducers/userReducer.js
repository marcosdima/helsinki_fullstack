import { createSlice } from "@reduxjs/toolkit"
import userService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        reset(state, action) {
            window.localStorage.clear()
            return null
        }
    }
})

export const { reset, setUser} = userSlice.actions

export const login = (password, username) => {
    return dispatch => {
        userService.login({ username, password })
            .then(userLogin => {
                window.localStorage.setItem(
                    'loggedBlogappUser',
                    JSON.stringify(userLogin)
                )
                blogService.setToken(userLogin.token)
                dispatch(setUser(userLogin))
            })
    }
}


export default userSlice.reducer