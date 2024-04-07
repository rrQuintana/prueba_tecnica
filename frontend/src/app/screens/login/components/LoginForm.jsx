import { useForm, Controller } from 'react-hook-form';
import { Button, CircularProgress, TextField } from '@mui/material';
import useLogin from '../../../logic/hooks/useLogin';

function LoginForm() {

  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({ defaultValues: { email: "", password: "" } });
  const { login, isLoading } = useLogin(setError, reset);

  const onSubmit = async (data) => {
    login(data, setError, reset)
  };

  return (
    <form className='space-y-8 w-2/3 flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='space-y-2'>
        <h1 className='text-center font-medium text-3xl'>Hola de nuevo!</h1>
        <p className='text-center text-zinc-500 font-light'>A continuación ingresa tus credenciales</p>
      </div>

      <div className='flex flex-col space-y-6 w-full'>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'El email es requerido' }}
          render={({ field }) => (
            <TextField
              type='email'
              name='email'
              label="Correo electrónico"
              helperText={errors.email ? errors.email.message : ''}
              error={!!errors.email}
              className="w-full my-12"
              color='info'
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "La contraseña es requerida", }}
          render={({ field }) => (
            <TextField
              type='password'
              label="Contraseña"
              helperText={errors.password ? errors.password.message : ''}
              error={!!errors.password}
              className="w-full my-12"
              color='info'
              {...field}
            />
          )}
        />
      </div>

      <Button variant='contained' type="submit" style={{ borderRadius: "4px", width: "100%" }} disabled={isLoading}>{isLoading ? <CircularProgress size={25} /> : "Enviar"}</Button>
    </form>
  )
}

export default LoginForm