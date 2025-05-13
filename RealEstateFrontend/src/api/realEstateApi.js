export async function fetchEstates({
  pageNumber = 1,
  pageSize = 9,
  searchWord = '',
  city = null,
  estateCategory = null,
  minPrice = null,
  maxPrice = null,
  minSize = null,
  maxSize = null,
  orderBy = null,
}) {
  const url = new URL(`${import.meta.env.VITE_API_URL}/api/estates`);
  url.searchParams.append('pageNumber', pageNumber);
  url.searchParams.append('pageSize', pageSize);
  if (searchWord) url.searchParams.append('searchWord', searchWord);
  if (city !== null && city !== '') url.searchParams.append('city', city);
  if (estateCategory !== null && estateCategory !== '')
    url.searchParams.append('estateCategory', estateCategory);
  if (minPrice) url.searchParams.append('minPrice', minPrice);
  if (maxPrice) url.searchParams.append('maxPrice', maxPrice);
  if (minSize) url.searchParams.append('minSize', minSize);
  if (maxSize) url.searchParams.append('maxSize', maxSize);
  if (orderBy !== null && orderBy !== '')
    url.searchParams.append('orderBy', orderBy);

  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error('Failed to fetch estates');

  const data = await response.json();
  const paginationHeader = response.headers.get('X-Pagination');
  const parsed = paginationHeader
    ? JSON.parse(paginationHeader)
    : { totalPageCount: 1 };

  const pagination = {
    ...parsed,
    totalPages: parsed.TotalPageCount,
  };

  return { data, pagination };
}

export async function login(username, password) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/authentication/authenticate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userName: username, password }),
    }
  );

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
}

export async function logout() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/authentication/logout`,
    {
      method: 'POST',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return await response.json();
}

export async function checkUser() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/authentication/check-user`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return await response.json();
}

export async function deleteEstate(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/estates/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete estate');
  }

  return true;
}

export async function createEstate(data) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/estates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const text = await response.text();
  console.log('CreateEstate response text:', text); // <-- Add this line

  if (!response.ok) {
    throw new Error(`Failed to create estate: ${response.status} - ${text}`);
  }

  try {
    const json = JSON.parse(text);
    console.log('Parsed createEstate response:', json); // <-- Add this too
    return json;
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    throw new Error('Server returned invalid JSON after creating estate.');
  }
}

export async function updateEstate(id, data) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/estates/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) throw new Error('Failed to update estate');
}

export async function fetchTags() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tags`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  const data = await response.json();
  return data.map((t) => ({ id: t.id, name: t.name }));
}

export async function uploadEstateImage(estateId, file) {
  console.log('Uploading image for estate ID:', estateId); // ✅ Add this

  const formData = new FormData();
  formData.append('files', file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/estates/${estateId}/images`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Image upload failed:', errorText);
    throw new Error(`Failed to upload image: ${response.status}`);
  }

  return true;
}
