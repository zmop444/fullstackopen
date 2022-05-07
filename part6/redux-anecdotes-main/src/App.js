import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initialize } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initialize()) 
        // initialize() returns a function that returns null- why pass it to dispatch?
        // assumption: initialize()'s return function requires a dispatch input, and redux thunk passes that for you, by you passing the func to dispatch. assumption only.
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <AnecdoteFilter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App