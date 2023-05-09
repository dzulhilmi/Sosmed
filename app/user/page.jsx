"use client";
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Box, Button, CircularProgress, IconButton, Snackbar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Fragment } from 'react';
import ImageDialog from '@components/ImageDialog';
import UserFormDialog from '@components/UserFormDialog';
import AlertDialog from '@components/AlertDialog';

const ImageButton = ({ params }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <IconButton
        onClick={handleClickOpen}
      >
        <ImageIcon />
      </IconButton>
      <ImageDialog
        value={params.value}
        open={open}
        onClose={handleClose}
      />
    </Fragment>
  )
}

const ActionColumns = ({ params, reload, setNotification }) => {
  const [openForm, setOpenForm] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (value) => {
    const res = await fetch(`https://dummyapi.io/data/v1/user/${value}`, {
      method: 'DELETE',
      headers: {
        'app-id': '62996cb2689bf0731cb00285'
      }
    })
    const data = await res.json();

    if (data) {
      setNotification({
        status: 'success',
        message: 'Delete data successfully',
        open: true
      })
    } else {
      setNotification({
        status: 'error',
        message: 'Delete data failed',
        open: true
      })
    }
    setAlert(false);
    reload()
  }
  return (
    <Box>
      <Button
        onClick={() => setOpenForm(true)}
      >Edit</Button>
      <UserFormDialog
        type="Edit"
        onClose={() => setOpenForm(false)}
        open={openForm}
        value={params.value}
        row={params.row}
        setNotification={setNotification}
        reload={reload}
      />
      <Button
        color="error"
        onClick={() => setAlert(true)}
      >Delete</Button>
      <AlertDialog
        onClose={() => setAlert(false)}
        open={alert}
        value={params.value}
        onSubmit={() => handleSubmit(params.value)}
      />

    </Box>
  )
}

const page = () => {

  const [data, setData] = useState({
    data: [],
    limit: 0,
    page: 1,
    total: 0
  });
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [notification, setNotification] = useState({
    status: 'success',
    message: 'This is a success message',
    open: false
  });

  const columns = [
    {
      field: 'fullname',
      headerName: 'Name',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'picture',
      headerName: 'Picture',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <ImageButton params={params} />
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <ActionColumns params={params} reload={() => fetchData(page)} setNotification={setNotification} />,
    },
  ];

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyapi.io/data/v1/user?limit=10&page=${query}&created=1`, {
        headers: {
          'app-id': '62996cb2689bf0731cb00285'
        }
      })
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }


  useEffect(() => {
    fetchData(page);
  }, [page])

  return (
    <Box
      component="section"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((v) => { return { ...v, open: false } })}
      >
        <Alert onClose={() => setNotification((v) => { return { ...v, open: false } })} severity={notification.status} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3
        }}
      >
        <Box>
          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
          >Create User</Button>
          <UserFormDialog
            open={openForm}
            onClose={setOpenForm}
            type="Create"
            reload={() => fetchData(page)}
            setNotification={setNotification}
          />
        </Box>
        {
          isLoading ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box> :
            <Box
              sx={{ background: '#FFF' }}
            >
              <DataGrid
                rows={data.data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                sx={{
                  minHeight: 200
                }}
              />
            </Box>
        }
      </Box>
    </Box>
  )
}

export default page