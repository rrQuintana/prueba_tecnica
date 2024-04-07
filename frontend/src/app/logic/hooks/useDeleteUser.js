import { useMutation } from "react-query";
import userRepository from "../repositories/user.repository";

function useDeleteUser(refetch) {
  const mutation = useMutation(userRepository.deleteUser,{
    onSuccess: () => {
      refetch()
    },
    onError: () => {}
  })

  const deleteUser = async (id) => {
    mutation.mutate(id)
  }

  return { ...mutation, deleteUser }
}

export default useDeleteUser