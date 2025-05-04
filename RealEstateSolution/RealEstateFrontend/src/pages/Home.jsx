import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import EstateGrid from '../components/EstateGrid'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [city, setCity] = useState('')

  return (
    <div style={{ padding: '2rem' }}>
      <SearchBar onSearch={setSearchTerm} onCityChange={setCity} />
      <EstateGrid searchTerm={searchTerm} city={city} />
    </div>
  )
}
