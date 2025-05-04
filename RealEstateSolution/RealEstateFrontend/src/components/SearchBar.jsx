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

export default function SearchBar({ onSearch, onCityChange }) {
  const [value, setValue] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(value)
    }
  }

  const handleCityChange = (e) => {
    const cityValue = e.target.value
    setSelectedCity(cityValue)
    onCityChange(cityValue)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={4} gap={2}>
      <TextField
        variant="outlined"
        placeholder="Search estates..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={{ width: '100%', maxWidth: 600 }}
      />
      <TextField
        select
        label="Filter by city"
        value={selectedCity}
        onChange={handleCityChange}
        sx={{ width: '100%', maxWidth: 600 }}
      >
        {cities.map((city) => (
          <MenuItem key={city.value} value={city.value}>
            {city.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
