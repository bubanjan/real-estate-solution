import { axiosInstance } from './axiosInstance';
import { handleAxiosError } from './handleAxiosError';

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
  const params = new URLSearchParams();

  params.append('pageNumber', pageNumber);
  params.append('pageSize', pageSize);
  if (searchWord) params.append('searchWord', searchWord);
  if (city !== null && city !== '') params.append('city', city);
  if (estateCategory !== null && estateCategory !== '') {
    params.append('estateCategory', estateCategory);
  }
  if (minPrice !== null) params.append('minPrice', minPrice);
  if (maxPrice !== null) params.append('maxPrice', maxPrice);
  if (minSize !== null) params.append('minSize', minSize);
  if (maxSize !== null) params.append('maxSize', maxSize);
  if (orderBy !== null && orderBy !== '') params.append('orderBy', orderBy);

  try {
    const response = await axiosInstance.get(
      `/api/estates?${params.toString()}`
    );

    const paginationHeader = response.headers['x-pagination'];
    const parsed = paginationHeader
      ? JSON.parse(paginationHeader)
      : { totalPageCount: 1 };

    const pagination = {
      ...parsed,
      totalPages: parsed.TotalPageCount,
    };

    return { data: response.data, pagination };
  } catch (error) {
    handleAxiosError(
      error,
      'Unexpected error occurred while fetching estates. Please try again later.'
    );
  }
}

export async function login(username, password) {
  try {
    const response = await axiosInstance.post(
      '/api/authentication/authenticate',
      {
        userName: username,
        password,
      }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Login failed. Please check your credentials.');
  }
}

export async function logout() {
  try {
    const response = await axiosInstance.post('/api/authentication/logout');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to logout. Please try again.');
  }
}

export async function checkUser() {
  try {
    const response = await axiosInstance.get('/api/authentication/check-user');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to check user authentication.');
  }
}

export async function deleteEstate(id) {
  try {
    await axiosInstance.delete(`/api/estates/${id}`);
    return true;
  } catch (error) {
    handleAxiosError(error, 'Failed to delete estate.');
  }
}

export async function createEstate(data) {
  try {
    const response = await axiosInstance.post('/api/estates', data);
    console.log('Created estate:', response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to create estate.');
  }
}

export async function updateEstate(id, data) {
  const cleanedData = {
    ...data,
    imageLinks: data.imageLinks?.map((link) => link.url) || [],
  };

  try {
    await axiosInstance.put(`/api/estates/${id}`, cleanedData);
  } catch (error) {
    handleAxiosError(error, 'Failed to update estate.');
  }
}

export async function fetchTags() {
  try {
    const response = await axiosInstance.get('/api/tags');
    return response.data.map((t) => ({ id: t.id, name: t.name }));
  } catch (error) {
    handleAxiosError(error, 'Failed to fetch tags.');
  }
}

export async function uploadEstateImage(estateId, file) {
  const formData = new FormData();
  formData.append('files', file);

  try {
    await axiosInstance.post(`/api/estates/${estateId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return true;
  } catch (error) {
    handleAxiosError(error, 'Failed to upload estate image.');
  }
}

export async function fetchUsers() {
  try {
    const response = await axiosInstance.get('/api/users');
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to fetch users.');
  }
}

export async function createUser(userData) {
  try {
    const response = await axiosInstance.post(
      '/api/authentication/register',
      userData
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to create user.');
  }
}

export async function deleteUser(userId) {
  try {
    await axiosInstance.delete(`/api/users/${userId}`);
  } catch (error) {
    handleAxiosError(error, 'Failed to delete user.');
  }
}
