import { useMutation } from "react-query";
import userRepository from "../repositories/user.repository";
import { useNavigate } from "react-router-dom";

function useCreateUser(setError) {
  const navigate = useNavigate()
  
  const createMutation = useMutation(userRepository.createUser,{
    onSuccess: () => {
      navigate('/')
    },
    onError: () => {}
  })

  const updateMutation = useMutation(userRepository.updateUser,{
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      if (errorMessage.includes('correo')) {
        setError('email', { type: 'manual', message: 'El email ya se encuentra registrado' })
      } else {
        setError('email', { type: 'manual', message: 'Error en el servidor, por favor intente más tarde' })
      }
    }
  })

  const createUser = async (data) => {
    createMutation.mutate(data)
  }

  const updateUser = async (data) => {
    updateMutation.mutate(data)
  }

  return { ...createMutation, ...updateUser, createUser, updateUser }
}

export default useCreateUser