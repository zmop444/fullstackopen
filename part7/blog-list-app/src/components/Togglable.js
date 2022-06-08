import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const Togglable = forwardRef(({ children, label }, ref) => {
  const [visible, setVisible] = useState(false)

  const hiddenViewStyle = { display: visible ? 'none' : '' }
  const childViewStyle = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  // not a fan https://reactjs.org/docs/hooks-reference.html#useimperativehandle
  useImperativeHandle(ref, () => {
    return { toggleVisible }
  })

  return (
    <>
      <div style={hiddenViewStyle}>
        <Button variant='contained' onClick={toggleVisible}>{label}</Button>
      </div>
      <div style={childViewStyle}>
        {children}
        <Button variant='text' onClick={toggleVisible}>Cancel</Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

// would much prefer ts tbqhfmlm
Togglable.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Togglable
