import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdote"

const slice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateVote(state, action) {
            const updatedAnecdote = action.payload
            const chosenAnecdote = state.find(anecdote => anecdote.id === updatedAnecdote.id)
            chosenAnecdote.votes = updatedAnecdote.votes
        },
        append(state, action) {
            const newAnecdote = action.payload
            state.push(newAnecdote)
        },
        setAll(state, action) {
            return action.payload
        }
    }
})

export const initialize = () => async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAll(anecdotes))
}

export const create = (content) => async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(append(anecdote))
}

export const vote = (anecdote) => async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(updateVote(updatedAnecdote))
}

export const { updateVote, append, setAll } = slice.actions
export default slice.reducer