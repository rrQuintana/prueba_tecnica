import { Autocomplete, Button, TextField } from "@mui/material"
import useGetRoles from "../../../logic/hooks/useGetRoles"
import { useState } from "react"

function Filters({ filters, setFilters }) {
  const { data: roles, isLoading: isLoadingRoles } = useGetRoles()
  const [role, setRole] = useState(null)
  const [search, setSearch] = useState(null)

  if (isLoadingRoles) return <p>Cargando...</p>

  return (
    <div className="flex flex-row space-x-5 w-2/5 items-center">
      <p>Filtrar: </p>
      <Autocomplete
        label="Rol"
        options={roles || []}
        value={role}
        getOptionLabel={(option) => option?.name}
        renderInput={(params) => (
          <TextField sx={{}} {...params} label="Rol" />
        )}
        sx={{ width: "100%" }}
        onChange={(_, value) => {
          setFilters({ ...filters, page: 1, role: value?.id })
          setRole(value)
        }}
      />
      <TextField
        label="Buscar"
        type="email"
        className="w-full"
        value={search}
        onChange={(e) => {
          setFilters({ ...filters, page: 1, search: e.target.value })
          setSearch(e.target.value)
        }}
      />
      <Button onClick={() => {
        setFilters({ page: 1, role: null, search: null }) // Limpiar todos los filtros
        setRole(null) // Reiniciar el estado local de role
        setSearch(null) // Reiniciar el estado local de search
      }} variant="contained" color="grey" sx={{ width: 200 }}>
        Clear
      </Button>

    </div>
  )
}

export default Filters