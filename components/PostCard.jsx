import { Box, Card, CardContent, CardMedia, Typography, ownerDocument } from '@mui/material'
import React from 'react'

const PostCard = ({ image, text, tags, owner }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="posted img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {owner?.firstName} {owner?.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          {
            tags && tags.map((tag, i) => (
              <Typography key={i} variant="caption" color="primary">
                #{tag}
              </Typography>
            ))
          }
        </Box>

      </CardContent>
    </Card>
  )
}

export default PostCard