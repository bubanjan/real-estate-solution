import { useEffect, useState } from 'react';
import { CircularProgress, Typography, Pagination, Box } from '@mui/material';
import EstateCard from './EstateCard';
import EstateFormModal from './EstateFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EstateDetailModal from './EstateDetailModal';
import { useEstateStore } from '../store/useEstateStore';
import { useAuthStore } from '../store/useAuthStore';
import { useFilterStore } from '../store/useFilterStore';

export default function EstateGrid() {
  const {
    estates,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchEstatesData,
    deleteEstateById,
    updateEstateById,
  } = useEstateStore();

  const { role } = useAuthStore();
  const {
    searchTerm,
    city,
    estateType,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    orderBy,
  } = useFilterStore();

  const [showModal, setShowModal] = useState(false);
  const [editingEstate, setEditingEstate] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [estateIdToDelete, setEstateIdToDelete] = useState(null);
  const [viewingEstate, setViewingEstate] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    fetchEstatesData();
  }, [
    page,
    searchTerm,
    city,
    estateType,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    orderBy,
  ]);

  const confirmDelete = (id) => {
    setEstateIdToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteEstateById(estateIdToDelete);
      setConfirmDeleteOpen(false);
      setEstateIdToDelete(null);
    } catch (err) {
      alert(`Failed to delete estate: ${err.message}`);
    }
  };

  const handleEdit = (estate) => {
    setEditingEstate(estate);
    setShowModal(true);
  };

  const handleSubmitEstate = async (formData, imageFile) => {
    try {
      if (editingEstate?.id) {
        setShowModal(false);
        setEditingEstate(null);
        await updateEstateById(editingEstate.id, formData, imageFile);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}
      >
        {estates.map((estate) => (
          <EstateCard
            key={estate.id}
            estate={estate}
            onDelete={confirmDelete}
            onEdit={handleEdit}
            onView={(estate) => setViewingEstate(estate)}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <EstateFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingEstate(null);
        }}
        onSubmit={handleSubmitEstate}
        initialData={editingEstate}
      />

      <DeleteConfirmationModal
        open={confirmDeleteOpen}
        onClose={() => {
          setConfirmDeleteOpen(false);
          setEstateIdToDelete(null);
        }}
        onConfirm={handleDelete}
      />

      <EstateDetailModal
        open={!!viewingEstate}
        onClose={() => setViewingEstate(null)}
        estate={viewingEstate}
      />
    </>
  );
}
