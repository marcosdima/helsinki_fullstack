/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const NotificationContext = createContext()
const initialState =  { messsage: null, isAnError: false}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE': {
            return action.payload
        }
        case 'RESET': return initialState
        default: return state     
    }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationMessage = () => {
    const all = useContext(NotificationContext)
    return all[0]
}

export const useNotificationDispatch = () => {
    const all = useContext(NotificationContext)
    return all[1]
}

export const useNotification = () => {
    const valueAndDispatch = useContext(NotificationContext)
    const dispatch = valueAndDispatch[1]

    return (message, isAnError=false) => {
        const action = messageAction({ message, isAnError })
        dispatch(action)
        setTimeout(() => {
            dispatch({ type: 'RESET' })
        }, 5000)
    }
}

const messageAction = (payload) => {
    return {
        type: 'SET_MESSAGE',
        payload
    }   
}

export default NotificationContext