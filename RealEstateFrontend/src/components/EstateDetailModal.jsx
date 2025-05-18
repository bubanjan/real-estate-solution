import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { useState } from 'react';

export default function EstateDetailModal({ open, onClose, estate }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!estate) return null;

  const images = (estate.imageLinks || []).map((img) => ({
    src: `${import.meta.env.VITE_API_URL}${img.url}`,
  }));

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <DialogContent sx={{ p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              {estate.title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Ref ID: #{estate.id}
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={2}>
            {estate.description}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            <Chip label={`📍 ${estate.city}`} variant="outlined" />
            <Chip
              label={`💶 ${estate.price} EUR`}
              color="success"
              variant="outlined"
            />
            <Chip label={`📐 ${estate.size} m²`} variant="outlined" />
            {estate.sellerContact && (
              <Chip label={`📞 ${estate.sellerContact}`} variant="outlined" />
            )}
          </Box>

          {estate.tags?.length > 0 && (
            <Box mb={2} display="flex" flexWrap="wrap" gap={1}>
              {estate.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{ backgroundColor: '#e0f7e9' }}
                />
              ))}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {images.length > 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Gallery
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={1.5}
                onClick={() => setLightboxOpen(true)}
                sx={{ cursor: 'pointer' }}
              >
                {images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img.src}
                    alt={`Estate Image ${i + 1}`}
                    width={120}
                    height={90}
                    sx={{
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: 1,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                ))}
              </Box>
              <Typography variant="caption" color="text.secondary" mt={1}>
                Click to open gallery
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images}
        plugins={[Thumbnails]}
      />
    </>
  );
}
