import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import noImage from '../assets/noImage.png'

export default function EstateCard({ estate }) {
  const trimDescription = (text, maxLength = 200) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text

  const imageUrl = estate.imageUrl || noImage

  return (
    <Card sx={{ cursor: 'pointer' }}>
      {/*   <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={estate.title || 'No Image Available'}
        sx={{ objectFit: 'contain', backgroundColor: '#f0f0f0' }}
      /> */}
      <CardContent>
        <Typography variant="h6">{estate.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {trimDescription(estate.description)}
        </Typography>
        <Typography mt={1}> {estate.price} EUR</Typography>
        <Typography> {estate.size} m²</Typography>
      </CardContent>
    </Card>
  )
}
