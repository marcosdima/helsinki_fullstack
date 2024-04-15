import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const UsersContext = createContext()

const usersReducer = (state, action) => {
    switch(action.type) {
    case 'SET': return action.payload
    case 'UPDATE': {
        const { user: target } = action.payload
        return state
            .map(user => 
                target.username !== user.username
                ? user
                : target
            )
    }
    default: return state
    }
}

const updateAction = (payload) => {
    return {
        type: 'UPDATE',
        payload
    }
}

export const UsersContextProvider = (props) => {
    const [users, usersDispatch] = useReducer(usersReducer, null)
    return (
        <UsersContext.Provider value={[users, usersDispatch]}>
            {props.children}
        </UsersContext.Provider>
    )
}
 
export const usersValue = () => {
    const [users] = useContext(UsersContext)
    return users
}

export const useUsers = () => {
    const [users, usersDispatch] = useContext(UsersContext)
    return (action) => usersDispatch(action)
}

export const incBlogsAction = (user, blog) => {
    const updatedUser = {
        ...user,
        blogs: user.blogs.concat(blog)
    }
    return updateAction(updatedUser) 
}

export const reduceBlogsAction = (user, blog) => {
    const updatedUser = {
        ...user,
        blogs: user.blogs.filter(element => element.id !== blog.id)
    }
    return updateAction(updatedUser) 
}