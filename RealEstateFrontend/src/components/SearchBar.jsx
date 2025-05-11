import { TextField, Box, MenuItem, Stack } from '@mui/material'
import { useState } from 'react'
import { cities, estateTypes } from '../constants/enums'

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
        <Box display="flex" flexDirection="column" alignItems="center" mb={2} gap={2} sx={{ backgroundColor: "#f0f7fc", padding: 2 }}>

            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                <TextField
                    
                    size="small"
                    variant="outlined"
                    placeholder="Search estates..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{ flex: 1, minWidth: 200, maxWidth: 290, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                },}} 
                />

                <TextField
                    size="small"
                    select
                    label="City"
                    onChange={(e) => onCityChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 270, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }}
                >
                    {cities.map((c) => (
                        <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    size="small"
                    select
                    label="Estate Type"
                    onChange={(e) => onTypeChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 270, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }}
                >
                    {estateTypes.map((t) => (
                        <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                    ))}
                </TextField>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                <TextField size="small" type="number" label="Min Price" onChange={(e) => onMinPriceChange(e.target.value)} 
                sx={{ flex: 1, minWidth: 150, maxWidth: 150, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }} />
                <TextField size="small" type="number" label="Max Price" onChange={(e) => onMaxPriceChange(e.target.value)} 
                sx={{ flex: 1, minWidth: 150, maxWidth: 150, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }} />
                <TextField size="small" type="number" label="Min Size" onChange={(e) => onMinSizeChange(e.target.value)} 
                sx={{ flex: 1, minWidth: 150, maxWidth: 150, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }} />
                <TextField size="small" type="number" label="Max Size" onChange={(e) => onMaxSizeChange(e.target.value)} 
                sx={{ flex: 1, minWidth: 150, maxWidth: 150, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }} />
                <TextField
                    size="small"
                    select
                    label="Order By"
                    onChange={(e) => onOrderChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 200, '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                } }}
                >
                    {orderOptions.map((o) => (
                        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                    ))}
                </TextField>
            </Stack>

        </Box>
    )
}
