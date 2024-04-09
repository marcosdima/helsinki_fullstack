import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationMessage(state, action) {
            return action.payload
        },
        reset() {
            return null
        }
    }
})

const { reset, setNotificationMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        setTimeout(() => dispatch(reset()), time * 1000)
        dispatch(setNotificationMessage(message))
    }
  }

export default notificationSlice.reducer