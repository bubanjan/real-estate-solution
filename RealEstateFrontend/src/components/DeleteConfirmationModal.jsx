import { Modal, Box, Typography, Stack, Button } from '@mui/material';

export default function DeleteConfirmationModal({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body2" mb={3}>
          Are you sure you want to delete?
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
