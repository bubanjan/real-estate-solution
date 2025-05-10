import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function EstateFormModal({ open, onClose, onSubmit, initialData = {} }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        size: '',
        city: '',
        estateCategory: ''
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || '',
                description: initialData.description || '',
                price: initialData.price || '',
                size: initialData.size || '',
                city: initialData.city || '',
                estateCategory: initialData.estateCategory || ''
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
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
                    <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth />
                    <TextField label="Estate Category" name="estateCategory" value={form.estateCategory} onChange={handleChange} fullWidth />
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
