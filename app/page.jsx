"use client"
import { useEffect, useState } from 'react'

import PostCard from "@components/PostCard";
import { Box, CircularProgress, Pagination, TextField } from "@mui/material";

export default function Home() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyapi.io/data/v1${search ? '/tag/' + search : ''}/post?limit=8&page=${page}`, {

      headers: {
        'app-id': '62996cb2689bf0731cb00285'
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setData(data);
      setLoading(false);
    }).catch((error) => {
      console.log(error)
    })
  }, [page, search])

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: '100vh',
        width: '100%',
        gap: 2,
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField id="search" variant="outlined" placeholder="Search by tag (single tag)" size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {isLoading ? <Box
        sx={{
          height: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
          <CircularProgress />
      </Box> :
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 3,
            height: '70%'
          }}
        >
          {
            data?.data?.map(post => (
              <PostCard
                key={post?.id}
                image={post?.image}
                likes={post?.likes}
                owner={post?.owner}
                publishDate={post?.publishDate}
                tags={post?.tags}
                text={post?.text}
              />
            ))
          }
        </Box>
      }
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Pagination count={data?.total || 10} color="primary" onChange={(e, v) => setPage(v)} />
      </Box>
    </Box>
  )
}
