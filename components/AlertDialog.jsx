"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const AlertDialog = ({ open, onClose, value, onSubmit }) => {
  const handleClose = () => {
    onClose(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent
        sx={{
          paddingTop: '20px!important'
        }}
      >
        <DialogContentText>
          Are you sure want to delete this data?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center'
        }}
      >
        <Button onClick={handleClose}>No</Button>
        <Button variant="contained" onClick={onSubmit} color='error'>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog