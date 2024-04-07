import { useMutation } from "react-query";
import userRepository from "../repositories/user.repository";

function useCreateUser(refetch) {
  const createMutation = useMutation(userRepository.createUser,{
    onSuccess: () => {
      refetch()
    },
    onError: () => {}
  })

  const updateMutation = useMutation(userRepository.updateUser,{
    onSuccess: () => {
      refetch()
    },
    onError: () => {}
  })

  const createUser = async (data) => {
    createMutation.mutate(data)
  }

  const updateUser = async (id) => {
    updateMutation.mutate(id)
  }

  return { ...createMutation, ...updateUser, createUser, updateUser }
}

export default useCreateUser