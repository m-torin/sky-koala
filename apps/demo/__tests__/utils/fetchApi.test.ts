import fetchMock from 'fetch-mock';

import {fetchFromApi} from '../../utils/fetchApi';

const API_BASE = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/api`; // Base URL for the API

beforeEach(() => {
  fetchMock.restore();
});

// Function to construct API URL
const apiUrl = (endpoint: string) => `${API_BASE}/${endpoint}`;

describe('fetchFromApi', () => {
  it('should successfully fetch data from the API', async () => {
    const endpoint = 'test-endpoint';
    const mockData = {key: 'value'};
    const url = apiUrl(endpoint);

    fetchMock.get(url, {
      status: 200,
      body: mockData,
    });

    const response = await fetchFromApi(endpoint);

    expect(response).toEqual(mockData);
    expect(fetchMock.called(url)).toBe(true);
  });

  it('should throw an error when the request fails', async () => {
    const endpoint = 'failing-endpoint';
    const url = apiUrl(endpoint);

    fetchMock.get(url, 500);

    await expect(fetchFromApi(endpoint)).rejects.toThrow(
      `Failed to fetch ${endpoint}`
    );
    expect(fetchMock.called(url)).toBe(true);
  });
});
