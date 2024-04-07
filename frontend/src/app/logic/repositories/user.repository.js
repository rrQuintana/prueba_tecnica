import axios from 'axios'
import api_base_url from '../../configs/api_base_url'

let session = JSON.parse(localStorage.getItem('loggedUser'))
let token = session ? session.token : ''

const getAllUsers = async (params) => {
  const response = await axios.get(`${api_base_url}/users`, { params })
  return response.data
}

const createUser = async (data) => {
  const response = await axios.post(`${api_base_url}/api/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const updateUser = async (id, data) => {
  const response = await axios.put(`${api_base_url}/api/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const deleteUser = async (id) => {
  const response = await axios.delete(`${api_base_url}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}