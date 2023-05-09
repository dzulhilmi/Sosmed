"use client";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {

  const drawerwidth = '16rem';

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      sx={{
        width: drawerwidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerwidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <List>
        <ListItem disablePadding
          sx={{

          }}
        >
          <ListItemButton
            LinkComponent={Link}
            href="/"
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <HomeIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding
          sx={{
            borderTop: '1px solid #c9c9c9'
          }}
        >
          <ListItemButton
            LinkComponent={Link}
            href="user"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="User" sx={{ textAlign: 'center' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding
          sx={{
            borderTop: '1px solid #c9c9c9',
            borderBottom: '1px solid #c9c9c9'
          }}
        >
          <ListItemButton
            LinkComponent={Link}
            href="post"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Post" sx={{ textAlign: 'center' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer >
  )
}

export default Sidebar