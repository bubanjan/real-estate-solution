import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">{estate.title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography mt={2}>{estate.description}</Typography>
          <Typography mt={1}>Location: {estate.city}</Typography>
          <Typography>Price: {estate.price} EUR</Typography>
          <Typography>Size: {estate.size} m²</Typography>
          {estate.sellerContact && (
            <Typography>Seller contact: {estate.sellerContact}</Typography>
          )}

          {images.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Image Gallery
              </Typography>
              <Box
                display="flex"
                gap={1}
                flexWrap="wrap"
                onClick={() => setLightboxOpen(true)}
                sx={{ cursor: 'pointer' }}
              >
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={`Estate Image ${i + 1}`}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                ))}
              </Box>
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
