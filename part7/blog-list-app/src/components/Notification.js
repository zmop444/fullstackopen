import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <Alert severity={notification.type} sx={{my: 3}}>{notification.message}</Alert>
  )
}

export default Notification
