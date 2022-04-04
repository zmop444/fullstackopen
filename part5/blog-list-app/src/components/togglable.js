import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

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
                <button onClick={toggleVisible}>{label}</button>
            </div>
            <div style={childViewStyle}>
                {children}
                <button onClick={toggleVisible}>Cancel</button>
            </div>
        </>
    )
})

Togglable.displayName = 'Togglable'

// would much prefer ts tbqhfmlm
Togglable.propTypes = {
    label : PropTypes.string.isRequired,
}

export default Togglable