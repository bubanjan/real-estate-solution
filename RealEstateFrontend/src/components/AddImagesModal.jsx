import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { cities, estateTypes } from '../constants/enums';
import { fetchTags } from '../api/realEstateApi';

export default function AddImagesModal({
  open,
  onClose,
  onSubmit,
  estateId,
  createdEstateIdValue,
}) {
  const [form, setForm] = useState({});

  //const [availableTags, setAvailableTags] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (open) {
      setForm({});
      setValidationError('');
    }
  }, [estateId, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setValidationError('');
    onSubmit(form, imageFile);
    setImageFile(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Images</DialogTitle>

      {validationError && (
        <Box color="error.main" ml={3} mb={1}>
          {validationError}
        </Box>
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
