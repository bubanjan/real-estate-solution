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
  MenuItem
} from '@mui/material'
import { useEffect, useState } from 'react'
import { cities, estateTypes } from '../constants/enums'
import { fetchTags } from '../api/realEstateApi'

export default function EstateFormModal({ open, onClose, onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    city: '',
    estateCategory: '',
    tagIds: []
  })

  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    fetchTags()
      .then(setAvailableTags)
      .catch(err => console.error('Failed to load tags:', err))
  }, [])

  useEffect(() => {
    if (open) {
      setForm({
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        size: initialData?.size || '',
        city: initialData?.city ?? '',
        estateCategory: initialData?.estateCategory ?? '',
        tagIds: initialData?.tagIds || initialData?.tags?.map(tag => tag.id) || []
      })
    }
  }, [initialData, open])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    onSubmit(form)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData?.id ? 'Edit Estate' : 'Create Estate'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
          <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" fullWidth />
          <TextField label="Size (m²)" name="size" value={form.size} onChange={handleChange} type="number" fullWidth />

          <FormControl fullWidth>
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
          </FormControl>

          <FormControl fullWidth>
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
                    const tag = availableTags.find((t) => t.id === id)
                    return tag?.name || id
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
