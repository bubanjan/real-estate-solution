import { TextField, Box } from '@mui/material'

export default function SearchBar() {
  return (
    <Box display="flex" justifyContent="center" mb={4}>
      <TextField
        variant="outlined"
        placeholder="Search estates..."
        fullWidth
        sx={{ maxWidth: 600 }}
      />
    </Box>
  )
}
