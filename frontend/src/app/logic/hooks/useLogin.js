import { useDispatch } from "react-redux";
import sessionService from "../auth/session.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { setSession } from "../auth/session.reducer";

function useLogin(setError, reset) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const loginMutation = useMutation(sessionService.login, {
    onSuccess: (user) => {
      dispatch(setSession(user));
      reset();
      navigation("/");
    },
    onError: (error) => {
      let errorMessage;
      if (error?.response?.status === 401) {
        errorMessage = "Credenciales incorrectas";
      } else {
        errorMessage = "Error en el servidor, por favor intente más tarde";
      }
      setError("email");
      setError("password", { type: "manual", message: errorMessage });
    }})

    const login = async (data) => {
      loginMutation.mutate(data)
    }

    return { ...loginMutation, login }
}

export default useLogin