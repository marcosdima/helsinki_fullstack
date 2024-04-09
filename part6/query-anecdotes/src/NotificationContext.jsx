/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_MESSAGE': {
            return action.payload
        }
        case 'RESET': return null
        default: return state     
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

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

export default NotificationContext