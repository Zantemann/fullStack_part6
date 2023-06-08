import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  timeout: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const { message, timeoutId } = action.payload
      state.message = message
      state.timeout = timeoutId
    },
    clearNotification(state, action) {
      state.message = ''
      state.timeout = null
    }
  }
})

export const setNotification = (message, timeoutSeconds) => {
  return (dispatch, getState) => {
    const { notification } = getState()
    clearTimeout(notification.timeout)

    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutSeconds * 1000)

    dispatch(showNotification({ message, timeout }))
  }
}

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer