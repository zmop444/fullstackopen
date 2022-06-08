import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.get(url)
  return response.data
}

export default { getAll, get }
