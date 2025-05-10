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
        <Box display="flex" flexDirection="column" alignItems="center" mb={4} gap={2}>

            {/* Row 1 */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search estates..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{ flex: 1, minWidth: 200, maxWidth: 290 }}
                />

                <TextField
                    select
                    label="City"
                    onChange={(e) => onCityChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 270 }}
                >
                    {cities.map((c) => (
                        <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Estate Type"
                    onChange={(e) => onTypeChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 270 }}
                >
                    {estateTypes.map((t) => (
                        <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                    ))}
                </TextField>
            </Stack>

            {/* Row 2 */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                <TextField type="number" label="Min Price" onChange={(e) => onMinPriceChange(e.target.value)} sx={{ flex: 1, minWidth: 150, maxWidth: 150 }} />
                <TextField type="number" label="Max Price" onChange={(e) => onMaxPriceChange(e.target.value)} sx={{ flex: 1, minWidth: 150, maxWidth: 150 }} />
                <TextField type="number" label="Min Size" onChange={(e) => onMinSizeChange(e.target.value)} sx={{ flex: 1, minWidth: 150, maxWidth: 150 }} />
                <TextField type="number" label="Max Size" onChange={(e) => onMaxSizeChange(e.target.value)} sx={{ flex: 1, minWidth: 150, maxWidth: 150 }} />
                <TextField
                    select
                    label="Order By"
                    onChange={(e) => onOrderChange(e.target.value)}
                    defaultValue=""
                    sx={{ flex: 1, minWidth: 200, maxWidth: 200 }}
                >
                    {orderOptions.map((o) => (
                        <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                    ))}
                </TextField>
            </Stack>

        </Box>
    )
}
