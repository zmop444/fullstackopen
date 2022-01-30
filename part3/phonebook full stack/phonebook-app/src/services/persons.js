import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (person) => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const deleteId = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

const update = (person) => {
    const url = `${baseUrl}/${person.id}`
    return axios.put(url, person).then(response => response.data)
}

export default {getAll, create, deleteId, update}