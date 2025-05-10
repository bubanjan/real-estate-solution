import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import EstateGrid from '../components/EstateGrid'
import { Box } from '@mui/material'

export default function Home({ auth }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [city, setCity] = useState('')
    const [estateType, setEstateType] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minSize, setMinSize] = useState('')
    const [maxSize, setMaxSize] = useState('')
    const [orderBy, setOrderBy] = useState('')

    return (
        <Box sx={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: "#f0f7fc" }}>
            <SearchBar
                onSearch={setSearchTerm}
                onCityChange={setCity}
                onTypeChange={setEstateType}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onMinSizeChange={setMinSize}
                onMaxSizeChange={setMaxSize}
                onOrderChange={setOrderBy}
            />
            <EstateGrid
                searchTerm={searchTerm}
                city={city}
                estateType={estateType}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minSize={minSize}
                maxSize={maxSize}
                orderBy={orderBy}
                auth={auth}
            />
        </Box>
    )
}
