import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from '@mui/material';
import noImage from '../assets/noImage4.png';
import { useAuthStore } from '../store/useAuthStore';
import { tagLabelMap } from '../constants/enums';

export default function EstateCard({ estate, onDelete, onEdit, onView }) {
  const { role } = useAuthStore();

  const trimDescription = (text, maxLength = 200) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}…` : text;

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onView?.(estate)}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          estate.imageLinks && estate.imageLinks.length > 0
            ? `${import.meta.env.VITE_API_URL}${estate.imageLinks[estate.imageLinks.length - 1].url
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
        <Typography mt={1}>Category: {estate.estateCategory}</Typography>
        <Typography mt={1}>Location: {estate.city}</Typography>
        <Typography mt={1}>Price: {estate.price} EUR</Typography>
        <Typography>Size: {estate.size} m²</Typography>
        {estate.sellerContact && (
          <Typography>Seller contact: {estate.sellerContact}</Typography>
        )}

        {estate.tags?.length > 0 && (
          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {estate.tags.map((tag) =>
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
                {tagLabelMap[tag.name] || tag.name}
              </Box>
            )}
          </Box>
        )}

      </CardContent>

      {(role === 'Admin' || role === 'Agent') && (
        <Box display="flex" gap={1} p={2} pt={0}>
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(estate);
            }}
          >
            🖋️ Edit
          </Button>
          {role === 'Admin' && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(estate.id);
              }}
            >
              🗑️ Delete
            </Button>
          )}
        </Box>
      )}
    </Card>
  );
}
