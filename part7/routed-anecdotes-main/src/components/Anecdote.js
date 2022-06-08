const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

export default Anecdote