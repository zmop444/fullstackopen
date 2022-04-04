import axios from 'axios'

const baseUrl = '/api/blogs'

let auth = null

const setToken = token => auth = `bearer ${token}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async blog => {
    const config = {
        headers: {
            Authorization: auth
        }
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

// backend has yet to use auth
const put = async (id, blog) => {
    const url = `${baseUrl}/${id}`
    const response = await axios.put(url, blog)
    return response.data
}

const deleteId = async (id) => {
    const url = `${baseUrl}/${id}`
    const config = {
        headers: {
            Authorization: auth
        }
    }
    const response = await axios.delete(url, config)
    return response.data
}

export default { setToken, getAll, create, put, deleteId }