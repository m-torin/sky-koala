// Setting the base URL for the API
const apiBase = `${process.env.webappUrl}/api`;

// Helper function to fetch from API
export const fetchFromApi = async (endpoint: string) => {
  const response = await fetch(`${apiBase}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
};
