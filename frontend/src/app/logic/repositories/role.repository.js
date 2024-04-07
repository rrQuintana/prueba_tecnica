import axios from 'axios'
import api_base_url from '../../configs/api_base_url'

let session = JSON.parse(localStorage.getItem('loggedUser'))
let token = session ? session.token : ''

const getAllRoles = async () => {
  const response = await axios.get(`${api_base_url}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default {
  getAllRoles
}