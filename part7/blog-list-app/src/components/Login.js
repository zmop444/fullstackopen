import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userThunks } from '../reducers/userReducer'
import Notification from './Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [showDialog, setShowDialog] = useState(false)

  const onSubmitForm = (event) => {
    event.preventDefault()
    dispatch(userThunks.login(username, password))
  }

  const onCloseDialog = () => setShowDialog(false)

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowDialog(true)}
      >
        Login
      </Button>
      <Dialog
        open={showDialog}
        onClose={onCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <Notification />
        <form onSubmit={onSubmitForm}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Don&apos;t have an account? That is very sad.
            </DialogContentText>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
            >
              <TextField
                required
                variant="outlined"
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                required
                variant="outlined"
                type="password"
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={onCloseDialog}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )

  /*
  return (
    <form id="login-form" onSubmit={onSubmitForm}>
      <label>
        username:
        <input
          type="text"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password:
        <input
          type="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button id="login" type="submit">
        Login
      </button>
    </form>
  )
  */
}

export default Login
