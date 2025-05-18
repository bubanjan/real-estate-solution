import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from '@mui/material';
import noImage from '../assets/noImage4.png';

export default function EstateCard({ estate, auth = {}, onDelete, onEdit }) {
  const trimDescription = (text, maxLength = 200) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}…` : text;
  return (
    <Card
      sx={{
        // cursor: 'pointer',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          estate.imageLinks && estate.imageLinks.length > 0
            ? `${import.meta.env.VITE_API_URL}${
                estate.imageLinks[estate.imageLinks.length - 1].url
              }`
            : noImage
        }
        alt={estate.title || 'No Image Available'}
        sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0' }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Ref ID: #{estate.id}
        </Typography>
        <Typography variant="h6">{estate.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {trimDescription(estate.description)}
        </Typography>
        <Typography mt={1}>Location: {estate.city}</Typography>
        <Typography mt={1}>Price: {estate.price} EUR</Typography>
        <Typography>Size: {estate.size} m²</Typography>
        {estate.sellerContact && (
          <Typography>Seller contact: {estate.sellerContact} </Typography>
        )}

        {estate.tags?.length > 0 && (
          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {estate.tags.map((tag) => (
              <Box
                key={tag.id}
                px={1.5}
                py={0.5}
                sx={{
                  backgroundColor: '#d1ffd3',
                  borderRadius: '16px',
                  fontSize: '0.75rem',
                }}
              >
                {tag.name}
              </Box>
            ))}
          </Box>
        )}

        {(auth.role === 'Admin' || auth.role === 'Agent') && (
          <Box mt={2} display="flex" gap={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onEdit(estate)}
            >
              🖋️ Edit
            </Button>
            {auth.role === 'Admin' && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onDelete(estate.id)}
              >
                🗑️ Delete
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
