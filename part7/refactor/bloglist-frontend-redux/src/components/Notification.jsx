import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isAnError } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  let color = 'green'
  if (isAnError) color = 'red'

  const notificationStyle = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderSadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.displayName = 'Notification'

export default Notification