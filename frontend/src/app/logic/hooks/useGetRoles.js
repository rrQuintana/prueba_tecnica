import { useQuery } from 'react-query'
import roleRepository from '../repositories/role.repository'

function useGetRoles () {
  return useQuery(
    ['useGetRoles'],
    () => roleRepository.getAllRoles(),
    { retry: 1 }
  )
}

export default useGetRoles