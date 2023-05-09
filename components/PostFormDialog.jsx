"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const PostFormDialog = ({ open, onClose, reload, type, setNotification, value, row }) => {

  const [formData, setFormData] = useState({
    owner: row?.owner || '',
    text: row?.text || '',
    likes: row?.likes || '',
    image: row?.image || '',
    tags: row?.tags || ''
  })
  const [error, setError] = useState({
    owner: '',
    text: '',
    likes: '',
    image: '',
    tags: ''
  })
  const [owners, setOwners] = useState([]);
  const [isOwnersLoading, setIsOwnersLoading] = useState(false);

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
      owner: '',
      text: '',
      likes: '',

      image: '',
      tags: '',
    })

    const tagsdata = formData.tags.split(' ');
    const postdata = {
      ...formData,
      tags: tagsdata
    }

    const reqOpt = {
      method: type === 'Create' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'app-id': '62996cb2689bf0731cb00285'
      },
      body: JSON.stringify(postdata)
    }
    
    try {
      const res = await fetch(`https://dummyapi.io/data/v1/post/${type === 'Create' ? 'create' : value}`, reqOpt);
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

  const fetchUserList = async () => {
    setIsOwnersLoading(true);
    const res = await fetch(`https://dummyapi.io/data/v1/user?limit=10&page=1&created=1`, {
      headers: {
        'app-id': '62996cb2689bf0731cb00285'
      }
    });

    const data = await res.json();
    if (data) {
      setOwners(data.data)
    }
    setIsOwnersLoading(false);
  }

  useEffect(() => {
    fetchUserList();
  }, [])

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
            <InputLabel id="owner-label">Owner</InputLabel>
            <Select
              labelId="owner-label"
              name="owner"
              label="Owner"
              required
              onChange={handleChange}
              value={formData.owner}
            >
              {
                owners && owners.map((owner, i) => (
                  <MenuItem key={owner.id} value={owner.id}>{owner.firstName} {owner.lastName}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="text"
            label="Text"
            error={error.text ? true : false}
            helperText={error.text}
            fullWidth
            onChange={handleChange}
            value={formData.text}
          />
          <TextField
            margin="dense"
            name="likes"
            label="Likes"
            type="number"
            error={error.likes ? true : false}
            helperText={error.likes}
            fullWidth
            onChange={handleChange}
            value={formData.likes}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image (Url)"
            error={error.image ? true : false}
            helperText={error.image}
            fullWidth
            onChange={handleChange}
            value={formData.image}
          />
          <TextField
            margin="dense"
            name="tags"
            label="Tags (senja surabaya)"
            error={error.tags ? true : false}
            helperText={error.tags}
            fullWidth
            onChange={handleChange}
            value={formData.tags}
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

export default PostFormDialog