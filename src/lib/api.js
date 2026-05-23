const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export async function chatWithBackend(query) {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is missing');
  }

  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}
