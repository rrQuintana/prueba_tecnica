import axios from 'axios'
import api_base_url from '../../configs/api_base_url'

const login = async credentials => {
  const response = await axios.post(`${api_base_url}/login`, credentials)
  return response.data
}

export default { login }