import { useDispatch, useSelector } from 'react-redux'
import { userThunks } from '../reducers/userReducer'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useState } from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [menuAnchor, setMenuAnchor] = useState(null)
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            color="inherit"
            sx={{ textDecoration: 'none', mr: 3 }}
          >
            &lt;BlogsApp /&gt;
          </Typography>
          <Box sx={{ flexGrow: 1, height: 'auto' }}>
            <Button variant="text" color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button variant="text" color="inherit" component={Link} to="/users">
              users
            </Button>
          </Box>
          {user ? (
            <>
              <Typography variant="h6" component="span" mr={1}>
                {user.username}
              </Typography>
              <Avatar onClick={(event) => setMenuAnchor(event.currentTarget)}>
                <AccountCircle />
              </Avatar>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                    dispatch(userThunks.logout())
                    setMenuAnchor(null)
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Login />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
