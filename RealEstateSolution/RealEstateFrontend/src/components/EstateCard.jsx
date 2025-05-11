import { Card, CardContent, Typography, Button, Box, CardMedia } from '@mui/material';
import noImage from '../assets/noImage.png';

export default function EstateCard({ estate, auth = {}, onDelete, onEdit }) {
  const trimDescription = (text, maxLength = 200) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}…` : text;

  const imageUrl = estate.imageUrl || noImage;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
     
      {/* <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={estate.title || 'No Image Available'}
        sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0' }}
      /> */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{estate.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {trimDescription(estate.description)}
        </Typography>
        <Typography mt={1}>{estate.price} EUR</Typography>
        <Typography>{estate.size} m²</Typography>

        {(auth.role === 'Admin' || auth.role === 'Agent') && (
          <Box mt={2} display="flex" gap={1}>
            <Button size="small" variant="outlined" onClick={() => onEdit(estate)}>
              🖋️ Edit
            </Button>
            {auth.role === 'Admin' && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onDelete(estate.id)}
              >
                🗑️ Delete
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
