import { useQuery } from 'react-query'
import userRepository from '../repositories/user.repository'

function useGetUsers (filters = {}) {
  return useQuery(
    ['useGetUsers', filters],
    () => userRepository.getAllUsers(filters),
    { retry: 1 }
  )
}

export default useGetUsers