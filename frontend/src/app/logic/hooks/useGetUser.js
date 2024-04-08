import { useQuery } from 'react-query'
import userRepository from '../repositories/user.repository'

function useGetUser (id) {
  return useQuery(
    ['useGetUser', id],
    () => userRepository.getUserById(id),
    { retry: 1 }
  )
}

export default useGetUser