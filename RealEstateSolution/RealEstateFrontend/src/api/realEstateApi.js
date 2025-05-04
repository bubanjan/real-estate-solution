export async function fetchEstates({ pageNumber = 1, pageSize = 12, searchWord = '' }) {
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/estates`)
    url.searchParams.append('pageNumber', pageNumber)
    url.searchParams.append('pageSize', pageSize)
    if (searchWord) {
      url.searchParams.append('searchWord', searchWord)
    }
  
    const response = await fetch(url, {
      credentials: 'include',
    })
  
    if (!response.ok) {
      throw new Error('Failed to fetch estates')
    }
  
    const data = await response.json()
    const paginationHeader = response.headers.get('X-Pagination')
    const pagination = paginationHeader ? JSON.parse(paginationHeader) : { totalPages: 1 }
    
    return { data, pagination }
  }
  