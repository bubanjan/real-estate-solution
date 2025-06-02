import { TextField, Box, MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import { cities, estateTypes } from '../constants/enums';
import { useFilterStore } from '../store/useFilterStore';

const orderOptions = [
  { label: 'Price Ascending', value: 0 },
  { label: 'Price Descending', value: 1 },
  { label: 'Size Ascending', value: 2 },
  { label: 'Size Descending', value: 3 },
];

export default function SearchBar() {
  const [value, setValue] = useState('');

  const {
    setSearchTerm,
    setCity,
    setEstateType,
    setMinPrice,
    setMaxPrice,
    setMinSize,
    setMaxSize,
    setOrderBy,
  } = useFilterStore();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(value);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={2}
      gap={2}
      sx={{ backgroundColor: '#f0f7fc', px: { xs: 1, sm: 2, md: 3 }, py: 2 }}
    >
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search estates..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 290,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />

        <TextField
          size="small"
          select
          label="City"
          onChange={(e) => setCity(e.target.value)}
          defaultValue=""
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 270,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        >
          {cities.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          select
          label="Estate Type"
          onChange={(e) => setEstateType(e.target.value)}
          defaultValue=""
          sx={{
            flex: 1,
            minWidth: 200,
            maxWidth: 270,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        >
          {estateTypes.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        rowGap={2}
      >
        <TextField
          size="small"
          type="number"
          label="Min Price"
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 140,
            maxWidth: 150,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <TextField
          size="small"
          type="number"
          label="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 140,
            maxWidth: 150,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <TextField
          size="small"
          type="number"
          label="Min Size"
          onChange={(e) => setMinSize(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 140,
            maxWidth: 150,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <TextField
          size="small"
          type="number"
          label="Max Size"
          onChange={(e) => setMaxSize(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 140,
            maxWidth: 150,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <TextField
          size="small"
          select
          label="Order By"
          onChange={(e) => setOrderBy(e.target.value)}
          defaultValue=""
          sx={{
            flex: 1,
            minWidth: 180,
            maxWidth: 200,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        >
          {orderOptions.map((o) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
}
