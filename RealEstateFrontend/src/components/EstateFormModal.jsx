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

export default function EstateFormModal({
  open,
  onClose,
  onSubmit,
  initialData = {},
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    city: '',
    estateCategory: '',
    tagIds: [],
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchTags()
      .then(setAvailableTags)
      .catch((err) => console.error('Failed to load tags:', err));
  }, []);

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData?.title || '',
        imageLinks: initialData?.imageLinks || [],
        description: initialData?.description || '',
        price: initialData?.price || '',
        size: initialData?.size || '',
        city: initialData?.city ?? '',
        estateCategory: initialData?.estateCategory ?? '',
        tagIds:
          initialData?.tagIds || initialData?.tags?.map((tag) => tag.id) || [],
        sellerContact: initialData?.sellerContact || '',
      });
      setValidationError('');
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.title || form.title.trim().length === 0) {
      setValidationError('Title is required.');
      return;
    }

    if (!form.description || form.description.trim().length === 0) {
      setValidationError('Description is required.');
      return;
    }

    if (form.description.length > 2500) {
      setValidationError('Description must be 2500 characters or less.');
      return;
    }

    if (!form.size || form.size < 1) {
      setValidationError('Size is required and must be greater than 0.');
      return;
    }

    if (!form.price || form.price < 1) {
      setValidationError('Price is required and must be greater than 0.');
      return;
    }

    if (!form.city) {
      setValidationError('City is required.');
      return;
    }

    if (!form.estateCategory) {
      setValidationError('Estate type is required.');
      return;
    }

    setValidationError('');
    onSubmit(form, imageFile);
    setImageFile(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData?.id ? 'Edit Estate' : 'Create Estate'}
      </DialogTitle>

      {validationError && (
        <Box color="error.main" ml={3} mb={1}>
          {validationError}
        </Box>
      )}

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            size="small"
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            error={!form.title}
            helperText={!form.title ? 'Title is required' : ''}
          />

          <TextField
            size="small"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            error={
              !form.description ||
              form.description.trim().length === 0 ||
              form.description.length > 2500
            }
            helperText={
              !form.description || form.description.trim().length === 0
                ? 'Description is required'
                : form.description.length > 2500
                ? 'Description must be 2500 characters or less.'
                : ''
            }
          />

          <TextField
            size="small"
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            fullWidth
            error={!form.price || form.price < 1}
            helperText={
              !form.price || form.price < 1
                ? 'Price must be greater than 0'
                : ''
            }
          />

          <TextField
            size="small"
            label="Size (m²)"
            name="size"
            value={form.size}
            onChange={handleChange}
            type="number"
            fullWidth
            error={!form.size || form.size < 1}
            helperText={
              !form.size || form.size < 1 ? 'Size must be greater than 0' : ''
            }
          />

          <FormControl fullWidth error={!form.city}>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              labelId="city-label"
              name="city"
              value={form.city}
              label="City"
              onChange={handleChange}
            >
              {cities.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
            {!form.city && <FormHelperText>City is required</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={!form.estateCategory}>
            <InputLabel id="estate-type-label">Estate Type</InputLabel>
            <Select
              labelId="estate-type-label"
              name="estateCategory"
              value={form.estateCategory}
              label="Estate Type"
              onChange={handleChange}
            >
              {estateTypes.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
            {!form.estateCategory && (
              <FormHelperText>Estate type is required</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              name="tagIds"
              multiple
              value={form.tagIds}
              onChange={(e) => setForm({ ...form, tagIds: e.target.value })}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const tag = availableTags.find((t) => t.id === id);
                    return tag?.name || id;
                  })
                  .join(', ')
              }
            >
              {availableTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Seller contact"
            name="sellerContact"
            value={form.sellerContact}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {initialData?.id && (
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
                const maxSize = 4 * 1024 * 1024;

                if (!validTypes.includes(file.type)) {
                  alert('Only JPG, PNG, WebP, or GIF images are allowed.');
                  return;
                }

                if (file.size > maxSize) {
                  alert('File size must be less than 4MB.');
                  return;
                }

                setImageFile(file);
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData?.id ? 'Update' : 'Create estate and add image'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
