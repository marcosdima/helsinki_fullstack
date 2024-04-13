import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
    switch(action.type) {
    case 'SET': return action.payload
    default: return state
    }
}

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}
 
export const userValue = () => {
    const [user] = useContext(UserContext)
    return user
}

export const useUser = () => {
    const [user, userDispatch] = useContext(UserContext)
    return (payload) => {
        const action = { type: 'SET', payload }
        userDispatch(action)
    }
}