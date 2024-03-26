const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    let color = 'green'

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

export default Notification