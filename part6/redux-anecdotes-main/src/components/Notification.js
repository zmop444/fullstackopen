import { connect } from "react-redux"

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

// using connect is no longer recommended. use hooks.
const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification