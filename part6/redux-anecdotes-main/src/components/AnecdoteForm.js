import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { showTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ create, showTimedNotification }) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        create(content)
        showTimedNotification(`added anecdote ${content}`, 5)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content' /></div>
                <button>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    create,
    showTimedNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm