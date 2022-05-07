import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { showTimedNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, onClick }) => (
    <div>
        {anecdote.content}
        <div>
            has {anecdote.votes}
            <button onClick={onClick}>vote</button>
        </div>
    </div>
)

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter.filter)
    const dispatch = useDispatch()
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.includes(filter))

    const displayAnecdotes = filteredAnecdotes

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(showTimedNotification(`voted for ${anecdote.content}`, 5))
    }

    return (
        <>
            {displayAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id} 
                    anecdote={anecdote}
                    onClick={() => voteAnecdote(anecdote)}/>
            )}
        </>
    )
}

export default AnecdoteList