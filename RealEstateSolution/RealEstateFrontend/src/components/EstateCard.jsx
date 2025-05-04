import { Card, CardMedia, CardContent, Typography } from '@mui/material'

export default function EstateCard({ estate }) {
  const trimDescription = (text, maxLength = 200) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text

  return (
    <Card sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="200"
        image={estate.imageUrl}
        alt={estate.title}
      />
      <CardContent>
        <Typography variant="h6">{estate.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {trimDescription(estate.description)}
        </Typography>
        <Typography mt={1}>💰 {estate.price} EUR</Typography>
        <Typography>📐 {estate.size} m²</Typography>
      </CardContent>
    </Card>
  )
}
