import { createTheme } from '@mui/material'
import { grey, blueGrey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
})

export default theme
