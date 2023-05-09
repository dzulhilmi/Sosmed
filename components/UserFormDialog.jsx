"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

const UserFormDialog = ({ open, onClose, reload, type, setNotification, value, row }) => {

  const [formData, setFormData] = useState({
    title: row?.title || '',
    firstName: row?.firstName || '',
    lastName: row?.lastName || '',
    email: row?.email || '',
    picture: row?.picture || ''
  })
  const [error, setError] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    picture: ''
  })

  const handleClose = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      picture: ''
    })
    const reqOpt = {
      method: type === 'Create' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '62996cb2689bf0731cb00285'
      },
      body: JSON.stringify(formData)
    }

    try {
      const res = await fetch(`https://dummyapi.io/data/v1/user/${type === 'Create' ? 'create' : value}`, reqOpt);
      const data = await res.json();
      if (!data.error) {
        setNotification({
          status: 'success',
          message: `${type === 'Create' ? 'Created' : 'Edited'} data successfuly`,
          open: true
        })
        handleClose();
        reload();
      } else {
        setNotification({
          status: 'error',
          message: data.error,
          open: true
        })
        setError((prev) => {
          return {
            ...prev,
            ...data.data
          }
        })
      }
    } catch (error) {
      console.error(error)
      handleClose();
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {type} Data User
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            paddingTop: '20px!important'
          }}
        >

          <FormControl
            fullWidth
          >
            <InputLabel id="title-label">Title</InputLabel>
            <Select
              labelId="title-label"
              name="title"
              label="Title"
              required
              onChange={handleChange}
              value={formData.title}
            >
              <MenuItem value={'mr'}>Mr</MenuItem>
              <MenuItem value={'mrs'}>Mrs</MenuItem>
              <MenuItem value={'miss'}>Miss</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            error={error.firstName ? true : false}
            helperText={error.firstName}
            fullWidth
            onChange={handleChange}
            value={formData.firstName}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            error={error.lastName ? true : false}
            helperText={error.lastName}
            fullWidth
            onChange={handleChange}
            value={formData.lastName}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            error={error.email ? true : false}
            helperText={error.email}
            fullWidth
            required
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            margin="dense"
            name="picture"
            label="Picture (Url)"
            error={error.picture ? true : false}
            helperText={error.picture}
            fullWidth
            onChange={handleChange}
            value={formData.picture}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" variant="contained" >Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UserFormDialog