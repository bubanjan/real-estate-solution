import { useEffect, useState } from 'react'
import {
    Grid,
    CircularProgress,
    Typography,
    Pagination,
    Box
} from '@mui/material'
import EstateCard from './EstateCard'
import { fetchEstates, deleteEstate } from '../api/realEstateApi'

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

    console.log("auth from EstateGrid:", auth);


    const [estates, setEstates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

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
        console.log("Edit clicked:", estate)
        // You can later redirect to /edit/:id or open a modal
    }

    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <>
            <Grid container spacing={3}>
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
        </>
    )
}
