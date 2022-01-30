const Notification = ({notification}) => {
    if(notification == null) {
        return null
    }
    let style = {
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    switch(notification.type) {
        case 'success':
            style = {...style, color: 'green'}
            break
        case 'warning':
            style = {...style, color: 'yellow'}
            break
        case 'error':
            style = {...style, color: 'red'}
            break
    }
    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default Notification