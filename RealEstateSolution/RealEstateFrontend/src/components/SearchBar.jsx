import { TextField, Box, MenuItem } from '@mui/material'
import { useState } from 'react'

const cities = [
    { label: 'All Cities', value: '' },
    { label: 'Budva', value: 0 },
    { label: 'Tivat', value: 1 },
    { label: 'Kotor', value: 2 },
    { label: 'Herceg Novi', value: 3 },
    { label: 'Bar', value: 4 },
    { label: 'Petrovac', value: 5 },
    { label: 'Ulcinj', value: 6 }
]

const estateTypes = [
    { label: 'All Types', value: '' },
    { label: 'Apartment', value: 0 },
    { label: 'House', value: 1 },
    { label: 'Land', value: 2 },
    { label: 'Office Space', value: 3 }
]

const orderOptions = [
    { label: 'Price Ascending', value: 0 },
    { label: 'Price Descending', value: 1 },
    { label: 'Size Ascending', value: 2 },
    { label: 'Size Descending', value: 3 }
]

export default function SearchBar({
    onSearch,
    onCityChange,
    onTypeChange,
    onMinPriceChange,
    onMaxPriceChange,
    onMinSizeChange,
    onMaxSizeChange,
    onOrderChange
}) {
    const [value, setValue] = useState('')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(value)
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={4} gap={2}>
            <TextField
                variant="outlined"
                placeholder="Search estates..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{ width: '100%', maxWidth: 600 }}
            />

            <TextField
                select
                label="City"
                onChange={(e) => onCityChange(e.target.value)}
                sx={{ width: '100%', maxWidth: 600 }}
                defaultValue=""
            >
                {cities.map((c) => (
                    <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Estate Type"
                onChange={(e) => onTypeChange(e.target.value)}
                sx={{ width: '100%', maxWidth: 600 }}
                defaultValue=""
            >
                {estateTypes.map((t) => (
                    <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                ))}
            </TextField>

            <Box display="flex" gap={2} sx={{ width: '100%', maxWidth: 600 }}>
                <TextField type="number" label="Min Price" onChange={(e) => onMinPriceChange(e.target.value)} fullWidth />
                <TextField type="number" label="Max Price" onChange={(e) => onMaxPriceChange(e.target.value)} fullWidth />
            </Box>

            <Box display="flex" gap={2} sx={{ width: '100%', maxWidth: 600 }}>
                <TextField type="number" label="Min Size" onChange={(e) => onMinSizeChange(e.target.value)} fullWidth />
                <TextField type="number" label="Max Size" onChange={(e) => onMaxSizeChange(e.target.value)} fullWidth />
            </Box>

            <TextField
                select
                label="Order By"
                onChange={(e) => onOrderChange(e.target.value)}
                sx={{ width: '100%', maxWidth: 600 }}
                defaultValue=""
            >
                {orderOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                ))}
            </TextField>
        </Box>
    )
}
