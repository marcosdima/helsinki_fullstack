import { createSlice } from "@reduxjs/toolkit"

const initialState = { message: null, isAnError: false }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationMessage(state, action) {
            const { message, isAnError } = action.payload
            return { message, isAnError }
        },
        reset() {
            return initialState
        }
    }
})

const { reset, setNotificationMessage } = notificationSlice.actions

export const setNotification = (message, isAnError, time) => {
    return dispatch => {
        setTimeout(() => dispatch(reset()), time * 1000)
        dispatch(setNotificationMessage({ message, isAnError }))
    }
}

export default notificationSlice.reducer