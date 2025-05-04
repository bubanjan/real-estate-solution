import { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Pagination, Box } from '@mui/material'
import EstateCard from './EstateCard'
import { fetchEstates } from '../api/realEstateApi'

export default function EstateGrid() {
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
        const { data, pagination } = await fetchEstates({ pageNumber: page })
        setEstates(data)
        setTotalPages(pagination.totalPages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadEstates()
  }, [page])

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <>
      <Grid container spacing={3}>
        {estates.map(estate => (
          <Grid item xs={12} sm={6} md={4} key={estate.id}>
            <EstateCard estate={estate} />
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
