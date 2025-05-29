export function handleAxiosError(
  error,
  fallbackMessage = 'An error occurred.'
) {
  const message = error.response?.data || error.message || fallbackMessage;

  console.error('API error:', message);
  throw new Error(message);
}
