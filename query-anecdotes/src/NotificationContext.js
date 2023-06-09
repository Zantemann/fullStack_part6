import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload
    case "CLEAR":
      return null
    default:
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationDispatch = useContext(NotificationContext)
  return notificationDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationDispatch = useContext(NotificationContext)
  return notificationDispatch[1]
}

export default NotificationContext