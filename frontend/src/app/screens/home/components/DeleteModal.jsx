import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} aria-label="delete" color="error">
        <DeleteIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className='space-y-10 absolute top-1/2 left-1/2 w-96 bg-white rounded-lg overflow-hidden p-5' style={{ transform: 'translate(-50%, -50%)' }}>
            <p className="text-3xl font-medium text-center">
              Eliminar usuario
            </p>
            <p className='text-xl text-center'>
              ¿Estás seguro de que deseas eliminar a {user.firstName} {user.lastName}?
            </p>
            <div className='flex flex-row justify-around'>
              <Button variant="contained" color="error" onClick={handleClose}>Eliminar</Button>
              <Button variant="contained" color="grey" onClick={handleClose}>Cancelar</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}