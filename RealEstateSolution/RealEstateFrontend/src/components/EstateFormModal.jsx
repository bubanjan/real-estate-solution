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

const cities = [
    { label: 'Budva', value: 'Budva' },
    { label: 'Tivat', value: 'Tivat' },
    { label: 'Kotor', value: 'Kotor' },
    { label: 'Herceg Novi', value: 'Herceg_Novi' },
    { label: 'Bar', value: 'Bar' },
    { label: 'Petrovac', value: 'Petrovac' },
    { label: 'Ulcinj', value: 'Ulcinj' }
]

const estateTypes = [
    { label: 'Apartment', value: 'Apartment' },
    { label: 'House', value: 'House' },
    { label: 'Land', value: 'Land' },
    { label: 'Office Space', value: 'OfficeSpace' }
]


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
                city: initialData.city ?? '',
                estateCategory: initialData.estateCategory ?? ''
            })
        }
    }, [initialData])

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
