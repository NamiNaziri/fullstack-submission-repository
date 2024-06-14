import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const updateLike = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${newObject.id}`, newObject, config)
  return response.data
}

const deleteBlog = async(deleteObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${deleteObject.id}`, config)
  return response.data
}


export default { getAll, create, updateLike, setToken, deleteBlog }