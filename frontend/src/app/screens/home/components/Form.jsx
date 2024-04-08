import { Controller } from "react-hook-form";
import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import useGetRoles from "../../../logic/hooks/useGetRoles";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Form({ control, handleSubmit, errors, onSubmit, isLoading, isLoadingUserData, isEditing, user, setValue }) {
  const navigation = useNavigate()
  const { data: roles, isLoading: isLoadingRoles } = useGetRoles()

  useEffect(() => {
    if (isEditing && !isLoadingUserData && user && !isLoadingRoles) {
      setValue('id', user.id)
      setValue('firstName', user.firstName)
      setValue('lastName', user.lastName)
      setValue('email', user.email)
      setValue('phoneNumber', user.phoneNumber)
      setValue('dateOfBirth', new Date(user.dateOfBirth).toISOString().split('T')[0])
      setValue('roleId', user.roleId)
      const role = roles?.find(role => role.id === user.roleId);
      setValue('role', role);
    }
  }, [isLoadingUserData, user, setValue, isEditing, roles, isLoadingRoles])

  if (isLoadingRoles || (isLoadingUserData && isEditing)) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/3 m-auto py-3 px-4 space-y-4 overflow-y-auto'>
      <h1 className="text-xl font-semibold">
        {!isEditing ? 'Crear nuevo usuario' : 'Editar usuario'}
      </h1>
      <div className="flex flex-row space-x-3">
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'El nombre es requerido' }}
          render={({ field }) => (
            <TextField
              label="Nombre"
              helperText={errors.firstName ? errors.firstName.message : ''}
              error={!!errors.firstName}
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'El apellido es requerido' }}
          render={({ field }) => (
            <TextField
              label="Apellido"
              helperText={errors.lastName ? errors.lastName.message : ''}
              error={!!errors.lastName}
              className="w-full"
              {...field}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'El correo electrónico es requerido' }}
        render={({ field }) => (
          <TextField
            label="Correo electrónico"
            type="email"
            helperText={errors.email ? errors.email.message : ''}
            error={!!errors.email}
            className="w-full"
            {...field}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: 'El número de teléfono es requerido', pattern: { value: /^[0-9]+$/, message: 'El número de teléfono solo puede contener números' }, minLength: { value: 10, message: 'El número de teléfono debe tener al menos 10 dígitos' } }}
        render={({ field }) => (
          <TextField
            label="Número de teléfono"
            helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
            error={!!errors.phoneNumber}
            className="w-full"
            {...field}
          />
        )}
      />
      <div>
        <Controller
          name="password"
          control={control}
          rules={isEditing ? {} : { required: 'La contraseña es requerida', minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' } }}
          render={({ field }) => (
            <TextField
              label="Contraseña"
              type="password"
              helperText={errors.password ? errors.password.message : ''}
              error={!!errors.password}
              className="w-full"
              {...field}
            />
          )}
        />
        {isEditing && (
          <p className="mb-5 font-light italic text-zinc-500 text-sm">Dejar en blanco no cambiará la contraseña</p>
        )}
      </div>
      <div className="flex flex-row space-x-3">
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: 'La fecha de nacimiento es requerida', validate: { futureDate: (value) => new Date(value) < new Date() || 'La fecha de nacimiento no puede ser mayor a la fecha actual' } }}
          render={({ field }) => (
            <TextField
              label="Fecha de nacimiento"
              type="date"
              helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
              error={!!errors.dateOfBirth}
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Selecciona un rol' }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              id="multiple-limit-tags"
              label="Rol"
              options={roles || []}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField {...params} label="Rol" error={!!errors.role} helperText={errors.role ? errors.role.message : ''} />
              )}
              sx={{ width: "100%" }}
              value={isEditing && roles?.find(role => role.id === user.roleId) || null}
              onChange={(_, value) => {
                field.onChange(value)
                setValue('roleId', value?.id)
              }}
            />
          )}
        />

      </div>
      <div className="flex flex-row justify-end space-x-5">
        <Button type="submit" variant="contained" color="primary">{isLoading ? <CircularProgress size={24} /> : 'Guardar'}</Button>
        <Button onClick={() => navigation('/')} variant="outlined" color="primary">Cancelar</Button>
      </div>
    </form>
  )
}

export default Form;
