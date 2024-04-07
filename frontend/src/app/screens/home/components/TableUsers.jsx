import { IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import EditIcon from '@mui/icons-material/Edit';
import DeleteModal from "./DeleteModal";

const TableCellHeader = ({ children }) => {
  return (
    <TableCell>
      <p className="text-white font-semibold">{children}</p>
    </TableCell>
  )
}

function TableUsers({ rol, usersData, isLoading, handlePageChange }) {
  const { page, totalPages, users } = usersData;

  return (
    <TableContainer className="bg-white shadow-md">
      <Table className="rounded-lg overflow-hidden">
        <TableHead>
          <TableRow className="bg-gradient-to-l from-cyan-500 to-blue-500">
            <TableCellHeader>ID</TableCellHeader>
            <TableCellHeader>Nombre</TableCellHeader>
            <TableCellHeader>Apellido</TableCellHeader>
            <TableCellHeader>Email</TableCellHeader>
            <TableCellHeader>Teléfono</TableCellHeader>
            <TableCellHeader>Fecha de Nacimiento</TableCellHeader>
            <TableCellHeader>Rol</TableCellHeader>
            {rol === 'Admin' && <TableCellHeader>Acciones</TableCellHeader>}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isLoading ? (
              <TableRow>
                <TableCell colSpan={7} rowSpan={5}>
                  <div className="flex h-full items-center justify-center">
                    <p>Cargando...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : users?.map(user => (
              <TableRow key={user.id}>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.id}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.firstName}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.lastName}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.email}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.phoneNumber}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {moment(user.dateOfBirth).format("MMM Do YY")}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }}>
                  {user.Role.name}
                </TableCell>
                {
                  rol === 'Admin' && (
                    <>
                      <TableCell className="space-x-5">
                        <DeleteModal user={user} />
                        <IconButton aria-label="edit" color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  )
                }
              </TableRow>
            ))
          }
          {!isLoading && users.length > 0 &&
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center justify-center">
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableUsers