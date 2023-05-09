"use client";
import { Dialog, DialogTitle } from '@mui/material';
import React from 'react'

const ImageDialog = ({ open, onClose, value }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <img
        width="100%"
        height="100%"
        src={value}
      />
    </Dialog>
  )
}

export default ImageDialog