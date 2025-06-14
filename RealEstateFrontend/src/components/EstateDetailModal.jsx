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
import DeleteIcon from '@mui/icons-material/Delete';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { useState, useEffect } from 'react';
import { deleteEstateImage } from '../api/realEstateApi';
import { useAuthStore } from '../store/useAuthStore';
import { tagLabelMap } from '../constants/enums';

export default function EstateDetailModal({ open, onClose, estate }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { role } = useAuthStore();

  useEffect(() => {
    if (estate?.imageLinks) {
      setImages(
        estate.imageLinks.map((img) => ({
          src: `${import.meta.env.VITE_API_URL}${img.url}`,
          url: img.url,
        }))
      );
    }
  }, [estate]);

  if (!estate) return null;

  const handleDeleteImage = async (imageUrl) => {
    try {
      await deleteEstateImage(estate.id, imageUrl);
      setImages((prev) => prev.filter((img) => img.url !== imageUrl));
      if (estate.imageLinks) {
        const updated = estate.imageLinks.filter((img) => img.url !== imageUrl);
        estate.imageLinks.length = 0;
        estate.imageLinks.push(...updated);
      }
    } catch (err) {
      alert('Failed to delete image.');
    }
  };

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
            <Chip label={`📁 ${estate.estateCategory}`} variant="outlined" />
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
                  label={tagLabelMap[tag.name] || tag.name}
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
              <Box display="flex" flexWrap="wrap" gap={1.5}>
                {images.map((img, i) => (
                  <Box position="relative" key={i}>
                    <Box
                      component="img"
                      src={img.src}
                      alt={`Estate Image ${i + 1}`}
                      width={120}
                      height={90}
                      onClick={() => {
                        setLightboxIndex(i);
                        setLightboxOpen(true);
                      }}
                      sx={{
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 1,
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    {(role === 'Admin' || role === 'Agent') && (
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255,0,0,0.8)',
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(img.url);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
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
        slides={images.map((img) => ({ src: img.src }))}
        index={lightboxIndex}
        plugins={[Thumbnails]}
      />
    </>
  );
}
