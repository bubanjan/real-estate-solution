import { Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import EstateGrid from '../components/EstateGrid';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          pt: '10px',
          position: 'sticky',
          top: 64,
          zIndex: 1000,
          backgroundColor: 'white',
        }}
      >
        <SearchBar />
      </Box>
      <Box padding={2}>
        <EstateGrid />
      </Box>
    </Box>
  );
}
