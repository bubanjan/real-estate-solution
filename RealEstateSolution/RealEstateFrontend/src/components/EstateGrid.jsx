import { useEffect, useState } from 'react';
import {
    CircularProgress,
    Typography,
    Pagination,
    Box,
    Button,
} from '@mui/material';
import EstateCard from './EstateCard';
import EstateFormModal from './EstateFormModal';
import {
    fetchEstates,
    deleteEstate,
    updateEstate,
    createEstate,
} from '../api/realEstateApi';

export default function EstateGrid({
    searchTerm,
    city,
    estateType,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    orderBy,
    auth,
}) {
    const [estates, setEstates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingEstate, setEditingEstate] = useState(null);

    useEffect(() => {
        async function loadEstates() {
            setLoading(true);
            setError(null);
            try {
                const { data, pagination } = await fetchEstates({
                    pageNumber: page,
                    pageSize: 12,
                    searchWord: searchTerm,
                    city,
                    estateCategory: estateType,
                    minPrice,
                    maxPrice,
                    minSize,
                    maxSize,
                    orderBy,
                });
                setEstates(data);
                setTotalPages(pagination.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadEstates();
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

    const refreshEstates = async () => {
        const { data, pagination } = await fetchEstates({
            pageNumber: page,
            pageSize: 12,
            searchWord: searchTerm,
            city,
            estateCategory: estateType,
            minPrice,
            maxPrice,
            minSize,
            maxSize,
            orderBy,
        });
        setEstates(data);
        setTotalPages(pagination.totalPages);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this estate?')) return;
        try {
            await deleteEstate(id);
            setEstates((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            alert(`Failed to delete estate: ${err.message}`);
        }
    };

    const handleEdit = (estate) => {
        setEditingEstate(estate);
        setShowModal(true);
    };

    const handleSubmitEstate = async (formData) => {
        try {
            if (editingEstate?.id) {
                await updateEstate(editingEstate.id, formData);
            } else {
                await createEstate(formData);
            }
            setShowModal(false);
            setEditingEstate(null);
            await refreshEstates();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <>
            {['Admin', 'Agent'].includes(auth.role) && (
                <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setEditingEstate(null);
                            setShowModal(true);
                        }}
                    >
                        💾 Create Estate
                    </Button>
                </Box>
            )}

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
                        auth={auth}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
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
        </>
    );
}
