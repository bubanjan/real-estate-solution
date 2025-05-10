import { useEffect, useState } from 'react'
import {
    Grid,
    CircularProgress,
    Typography,
    Pagination,
    Box,
    Button
} from '@mui/material'
import EstateCard from './EstateCard'
import EstateFormModal from './EstateFormModal'
import { fetchEstates, deleteEstate, updateEstate, createEstate } from '../api/realEstateApi'

export default function EstateGrid({
    searchTerm,
    city,
    estateType,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    orderBy,
    auth
}) {

    const [estates, setEstates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [editingEstate, setEditingEstate] = useState(null)

    useEffect(() => {
        async function loadEstates() {
            setLoading(true)
            setError(null)
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
                    orderBy
                })
                setEstates(data)
                setTotalPages(pagination.totalPages)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadEstates()
    }, [
        page,
        searchTerm,
        city,
        estateType,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        orderBy
    ])

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this estate?")
        if (!confirm) return

        try {
            await deleteEstate(id)
            setEstates(estates.filter(e => e.id !== id))
        } catch (err) {
            alert("Failed to delete estate: " + err.message)
        }
    }

    const handleEdit = (estate) => {
        setEditingEstate(estate)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingEstate(null)
    }

    const handleSubmitEstate = async (formData) => {
        try {
            if (editingEstate?.id) {
                await updateEstate(editingEstate.id, formData)
            } else {
                await createEstate(formData)
            }

            handleCloseModal()

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
                orderBy
            })

            setEstates(data)
            setTotalPages(pagination.totalPages)
        } catch (err) {
            alert(err.message)
        }
    }



    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <>
            {['Admin', 'Agent'].includes(auth.role) && (
                <Box display="flex" justifyContent="flex-start" mb={2}>
                    <Button variant="contained" onClick={() => {
                        setEditingEstate(null)
                        setShowModal(true)
                    }}>
                        💾 Create Estate
                    </Button>
                </Box>
            )}
            <Grid container spacing={3} sx={{ backgroundColor: "#f0f7fc", }}>
                {estates.map((estate) => (
                    <Grid item xs={12} sm={6} md={4} key={estate.id}>
                        <EstateCard
                            estate={estate}
                            auth={auth}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>

            <EstateFormModal
                open={showModal}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEstate}
                initialData={editingEstate}
            />
        </>
    )
}
