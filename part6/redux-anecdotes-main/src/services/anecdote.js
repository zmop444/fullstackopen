import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    // a server operation in practice:
    const anecdote = {
        content,
        // id by json-server
        votes: 0
    }

    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (anecdote) => {
    // a server operation in practice:
    const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }

    const url = `${baseUrl}/${anecdote.id}`
    const response = await axios.put(url, votedAnecdote)
    return response.data
}

const anecdoteService = { getAll, create, vote }
export default anecdoteService