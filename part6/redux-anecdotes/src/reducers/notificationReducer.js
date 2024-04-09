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

export const { reset, setNotificationMessage } = notificationSlice.actions
export default notificationSlice.reducer