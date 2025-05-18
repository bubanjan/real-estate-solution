import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function AddImagesModal({ open, onClose, onSubmit, estateId }) {
  const [validationError, setValidationError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (open) {
      setValidationError('');
      setImageFile(null);
    }
  }, [estateId, open]);

  const handleSubmit = () => {
    if (!imageFile) {
      setValidationError('Please choose an image before submitting.');
      return;
    }

    setValidationError('');
    onSubmit(imageFile);
    setImageFile(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Images</DialogTitle>

      {validationError && (
        <Typography color="error" ml={3} mb={1}>
          {validationError}
        </Typography>
      )}

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}></Box>

        <Box>
          <Typography>Add image:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              const validTypes = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
              ];
              const maxSize = 2 * 1024 * 1024;

              if (!validTypes.includes(file.type)) {
                alert('Only JPG, PNG, WebP, or GIF images are allowed.');
                return;
              }

              if (file.size > maxSize) {
                alert('File size must be less than 2MB.');
                return;
              }

              setImageFile(file);
              setValidationError('');
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Images
        </Button>
      </DialogActions>
    </Dialog>
  );
}
