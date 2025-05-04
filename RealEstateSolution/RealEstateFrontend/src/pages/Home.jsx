import SearchBar from '../components/SearchBar'
import EstateGrid from '../components/EstateGrid'

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <SearchBar />
      <EstateGrid />
    </div>
  )
}
